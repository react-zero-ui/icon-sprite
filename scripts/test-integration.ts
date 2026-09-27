import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const fixturePath = path.join(root, "fixtures/next-app");
const libraryPath = path.join(root, "packages/icon-sprite");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" };

interface FixtureManifest {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface PackageLock {
  packages: Record<string, { version?: string }>;
}

interface PackedPackage {
  filename: string;
  files: { path: string }[];
}

function run(args: string[], cwd: string): string {
  try {
    return execFileSync(npm, args, { cwd, env, encoding: "utf8", timeout: 300_000, maxBuffer: 16 * 1024 * 1024 });
  } catch (error) {
    const stdout = error instanceof Error && "stdout" in error ? String(error.stdout ?? "") : "";
    const stderr = error instanceof Error && "stderr" in error ? String(error.stderr ?? "") : "";
    throw new Error(`npm ${args.join(" ")} failed:\n${stdout.slice(-12_000)}\n${stderr.slice(-12_000)}`, {
      cause: error,
    });
  }
}

async function availablePort(): Promise<number> {
  const server = net.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert(address && typeof address === "object", "Expected a TCP address for the test server");
  const { port } = address;
  await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  return port;
}

// Each server owns its process group and cleanup, including failed assertions.
async function verifyServer(
  directory: string,
  mode: "start" | "dev",
  verify: (base: string) => Promise<void>,
): Promise<void> {
  const port = await availablePort();
  const nextCli = path.join(directory, "node_modules/next/dist/bin/next");
  const child = spawn(process.execPath, [nextCli, mode, "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: directory,
    env: { ...env, NODE_ENV: mode === "start" ? "production" : "development" },
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  let processError: Error | undefined;
  const append = (chunk: Buffer) => {
    output = (output + chunk).slice(-24_000);
  };
  child.stdout.on("data", append);
  child.stderr.on("data", append);
  child.on("error", (error) => {
    processError = error;
  });
  const base = `http://127.0.0.1:${port}`;

  try {
    const deadline = Date.now() + 180_000;
    let ready = false;
    while (Date.now() < deadline) {
      if (processError || child.exitCode !== null) {
        throw new Error(`Next ${mode} exited before readiness.\n${output}`, { cause: processError });
      }
      try {
        const response = await fetch(base, { signal: AbortSignal.timeout(5_000) });
        if (response.ok) {
          ready = true;
          break;
        }
      } catch {
        // Connection failures are expected while Next compiles and starts.
      }
      await delay(250);
    }
    assert(ready, `Next ${mode} did not become ready.\n${output}`);
    await verify(base);
  } finally {
    const pid = child.pid;
    if (child.exitCode === null && pid) {
      const signal = (value: NodeJS.Signals) => {
        try {
          if (process.platform === "win32") child.kill(value);
          else process.kill(-pid, value);
        } catch (error) {
          if (!(error instanceof Error && "code" in error && error.code === "ESRCH")) throw error;
        }
      };
      const exited = once(child, "exit");
      const killTimer = setTimeout(() => signal("SIGKILL"), 5_000);
      signal("SIGTERM");
      try {
        await exited;
      } finally {
        clearTimeout(killTimer);
      }
    }
  }
}

const directory = await fs.mkdtemp(path.join(os.tmpdir(), "zero-icon-integration-"));
try {
  const fixture: FixtureManifest = JSON.parse(await fs.readFile(path.join(fixturePath, "package.json"), "utf8"));
  const lock: PackageLock = JSON.parse(await fs.readFile(path.join(root, "package-lock.json"), "utf8"));
  const [packed]: PackedPackage[] = JSON.parse(
    run(["pack", "--json", "--ignore-scripts", "--pack-destination", directory], libraryPath),
  );
  const packedPaths = packed.files.map((file) => file.path);
  for (const required of [
    "dist/index.js",
    "dist/index.d.ts",
    "dist/LICENSE",
    "dist/cli/index.js",
    "generated/component-sprite-map.json",
    "generated/lucide-icons.json",
  ]) {
    assert(packedPaths.includes(required), `Packed package is missing ${required}`);
  }
  assert(
    !packedPaths.some((file) => /^(src|assets|tests|scripts|node_modules)\//.test(file)),
    "Package contains repository-only files",
  );

  for (const entry of ["app", "public", "next.config.ts", "postcss.config.mjs", "zero-ui.config.ts", "tsconfig.json"]) {
    await fs.cp(path.join(fixturePath, entry), path.join(directory, entry), {
      recursive: true,
      filter: (source) => source !== path.join(fixturePath, "public/icons.svg"),
    });
  }
  const dependencies: Record<string, string> = {};
  for (const name of Object.keys({ ...fixture.dependencies, ...fixture.devDependencies })) {
    if (name === "@react-zero-ui/icon-sprite") continue;
    const entry = lock.packages[`fixtures/next-app/node_modules/${name}`] ?? lock.packages[`node_modules/${name}`];
    assert(entry?.version, `No locked fixture dependency: ${name}`);
    dependencies[name] = entry.version;
  }
  dependencies["@react-zero-ui/icon-sprite"] = `file:./${packed.filename}`;
  await fs.writeFile(
    path.join(directory, "package.json"),
    JSON.stringify(
      {
        name: "icon-sprite-package-test",
        private: true,
        type: "module",
        scripts: { prebuild: "zero-icons", build: "next build" },
        dependencies,
      },
      null,
      2,
    ),
  );

  console.log("Installing the packed library in an isolated Next fixture...");
  run(["install", "--no-audit", "--no-fund"], directory);
  console.log("Building the production fixture and sprite...");
  run(["run", "build"], directory);
  assert.equal(
    (await fs.lstat(path.join(directory, "node_modules/@react-zero-ui/icon-sprite"))).isSymbolicLink(),
    false,
    "Fixture unexpectedly uses a workspace symlink",
  );

  await verifyServer(directory, "start", async (base) => {
    const spriteResponse = await fetch(`${base}/icons.svg`, { signal: AbortSignal.timeout(10_000) });
    assert.equal(spriteResponse.status, 200);
    const sprite = await spriteResponse.text();
    const symbols = new Set([...sprite.matchAll(/<symbol\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]));
    for (const route of ["/", "/zero-icon-sprite"]) {
      const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(30_000) });
      assert.equal(response.status, 200);
      const html = await response.text();
      const ids = [...html.matchAll(/<use\b[^>]*href="\/icons\.svg#([^"]+)"/g)].map((match) => match[1]);
      assert(ids.length > 0, `${route} has no production sprite references`);
      for (const id of ids) assert(symbols.has(id), `Missing sprite symbol: ${id}`);
    }
    for (const id of ["arrow-right", "tabler-accessible", "google-ads", "ai", "react-svgrepo-com"]) {
      assert(symbols.has(id), `Missing required fixture symbol: ${id}`);
    }
    const comparison = await fetch(`${base}/lucid-react`, { signal: AbortSignal.timeout(30_000) });
    assert.equal(comparison.status, 200);
    assert.match(await comparison.text(), /<path\b/);
  });
  await verifyServer(directory, "dev", async (base) => {
    const response = await fetch(base, { signal: AbortSignal.timeout(30_000) });
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /<path\b/, "Development icons should render inline SVG paths");
    assert.doesNotMatch(
      html,
      /<use\b[^>]*href="\/icons\.svg#arrow-right"/,
      "Development ArrowRight unexpectedly uses the production sprite",
    );
  });
  console.log(
    "Passed: package contents, isolated install, production build, served sprite symbols, and development rendering.",
  );
} finally {
  await fs.rm(directory, { recursive: true, force: true });
}
