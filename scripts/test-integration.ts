import assert from "node:assert/strict"
import { execFileSync, spawn } from "node:child_process"
import { once } from "node:events"
import fs from "node:fs/promises"
import net from "node:net"
import os from "node:os"
import path from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { fileURLToPath } from "node:url"
// biome-ignore lint/performance/noNamespaceImport: Playwright re-exports browser types through playwright-core; this Node-only harness is never bundled.
import * as playwright from "playwright"

type Browser = Awaited<ReturnType<typeof playwright.chromium.launch>>

const root = fileURLToPath(new URL("../", import.meta.url))
const fixturePath = path.join(root, "fixtures/next-app")
const libraryPath = path.join(root, "packages/icon-sprite")
const npm = process.platform === "win32" ? "npm.cmd" : "npm"
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }
const repositoryOnlyPathPattern = /^(src|tests|scripts|node_modules)\//
const rawArchivePathPattern = /^assets\/(lucide|tabler)\//
const browserIconImplementationPattern = /\/icons\.svg#|icon-tabler-|lucide lucide-/
const spriteSymbolPattern = /<symbol\b[^>]*\bid="([^"]+)"/g
const spriteReferencePattern = /<use\b[^>]*href="\/icons\.svg#([^"]+)"/g
const inlinePathPattern = /<path\b/
const arrowRightSpritePattern = /<use\b[^>]*href="\/icons\.svg#arrow-right"/
const browserNames = ["chromium", "firefox", "webkit"] as const
type BrowserName = (typeof browserNames)[number]
const browserLaunchers: Record<BrowserName, () => Promise<Browser>> = {
  chromium: () => playwright.chromium.launch({ headless: true }),
  firefox: () => playwright.firefox.launch({ headless: true }),
  webkit: () => playwright.webkit.launch({ headless: true }),
}
const presentationCases = [
  "default",
  "text-color",
  "stroke-over-color",
  "fill",
  "stroke-width",
  "line-cap",
  "line-join",
  "tabler-default",
  "accessible",
  "custom-fixed",
  "custom-fixed-again",
  "custom-inherit",
  "custom-current-color",
  "custom-nested",
] as const

interface FixtureManifest {
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

interface PackageLock {
  packages: Record<string, { version?: string }>
}

interface PackedPackage {
  filename: string
  files: { path: string }[]
}

interface PresentationCapture {
  screenshots: Map<string, Buffer>
  styles: Record<string, Record<string, string>>
}

function run(args: string[], cwd: string): string {
  try {
    return execFileSync(npm, args, {
      cwd,
      encoding: "utf8",
      env,
      maxBuffer: 16 * 1024 * 1024,
      timeout: 300_000,
    })
  } catch (error) {
    const stdout = error instanceof Error && "stdout" in error ? String(error.stdout ?? "") : ""
    const stderr = error instanceof Error && "stderr" in error ? String(error.stderr ?? "") : ""
    throw new Error(
      `npm ${args.join(" ")} failed:\n${stdout.slice(-12_000)}\n${stderr.slice(-12_000)}`,
      {
        cause: error,
      }
    )
  }
}

// Wait for in-flight operations before propagating failures so cleanup can safely remove their resources.
async function finishAll(tasks: Promise<void>[]): Promise<void> {
  try {
    await Promise.all(tasks)
  } catch (error) {
    await Promise.allSettled(tasks)
    throw error
  }
}

async function availablePort(): Promise<number> {
  const server = net.createServer()
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  const address = server.address()
  assert(address && typeof address === "object", "Expected a TCP address for the test server")
  const { port } = address
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  )
  return port
}

async function readJavaScriptTree(rootDirectory: string): Promise<string> {
  const entries = await fs.readdir(rootDirectory, { recursive: true, withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => path.join(entry.parentPath, entry.name))
  return (await Promise.all(files.map((file) => fs.readFile(file, "utf8")))).join("\n")
}

async function capturePresentation(
  browserInstance: Browser,
  base: string,
  mode: "production" | "development"
): Promise<PresentationCapture> {
  const context = await browserInstance.newContext({
    colorScheme: "light",
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    viewport: { height: 720, width: 900 },
  })
  const page = await context.newPage()
  try {
    await page.goto(`${base}/presentation-parity`, { waitUntil: "load" })
    await page.getByTestId("default").waitFor()
    await page.waitForFunction(
      ({ testIds, mode: renderingMode }) =>
        testIds.every((testId) => {
          const element = document.querySelector(`[data-testid="${testId}"]`)
          if (!(element instanceof SVGGraphicsElement)) {
            return false
          }
          // Wait for the actual custom payload, even when a usable sprite fallback exists.
          if (
            renderingMode === "development" &&
            testId.startsWith("custom-") &&
            !element.querySelector("svg")
          ) {
            return false
          }
          const box = element.getBBox()
          return box.width > 0 && box.height > 0
        }),
      { testIds: presentationCases, mode }
    )

    const captureCase = async (testId: (typeof presentationCases)[number]) => {
      const icon = page.getByTestId(testId)
      assert.equal(
        await icon.getAttribute("aria-hidden"),
        testId === "accessible" ? "false" : "true"
      )
      const useCount = await icon.locator("use").count()
      assert.equal(
        useCount > 0,
        mode === "production",
        `${testId}: expected ${mode} icon structure`
      )
      const styles = await icon.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          color: style.color,
          fill: style.fill,
          stroke: style.stroke,
          strokeLinecap: style.strokeLinecap,
          strokeLinejoin: style.strokeLinejoin,
          strokeWidth: style.strokeWidth,
        }
      })
      const screenshot = await icon.screenshot({ animations: "disabled" })
      return { screenshot, styles, testId }
    }
    const captures: Array<{
      screenshot: Buffer
      styles: Record<string, string>
      testId: (typeof presentationCases)[number]
    }> = []
    for (const testId of presentationCases) {
      // biome-ignore lint/performance/noAwaitInLoops: Screenshots share one page and are intentionally serialized for deterministic capture.
      captures.push(await captureCase(testId))
    }
    return {
      screenshots: new Map(captures.map(({ screenshot, testId }) => [testId, screenshot])),
      styles: Object.fromEntries(captures.map(({ styles, testId }) => [testId, styles])),
    }
  } finally {
    await context.close()
  }
}

function assertExpectedPresentation(capture: PresentationCapture): void {
  assert.equal(capture.styles.default.fill, "none")
  assert.equal(capture.styles.default.stroke, capture.styles.default.color)
  assert.equal(capture.styles.default.strokeWidth, "2px")
  assert.equal(capture.styles.default.strokeLinecap, "round")
  assert.equal(capture.styles.default.strokeLinejoin, "round")
  assert.equal(capture.styles["text-color"].stroke, capture.styles["text-color"].color)
  assert.notEqual(capture.styles["text-color"].color, capture.styles.default.color)
  assert.equal(capture.styles["stroke-over-color"].color, "rgb(0, 0, 255)")
  assert.equal(capture.styles["stroke-over-color"].stroke, "rgb(255, 0, 0)")
  assert.equal(capture.styles.fill.fill, "rgb(255, 0, 0)")
  assert.equal(capture.styles.fill.stroke, "rgb(0, 0, 255)")
  assert.equal(capture.styles["stroke-width"].strokeWidth, "4px")
  assert.equal(capture.styles["line-cap"].strokeLinecap, "square")
  assert.equal(capture.styles["line-join"].strokeLinejoin, "bevel")
  assert.equal(capture.styles["tabler-default"].strokeWidth, "2px")
  assert.equal(capture.styles["custom-inherit"].fill, "rgb(255, 0, 0)")
  assert.equal(capture.styles["custom-current-color"].color, "rgb(0, 0, 255)")
  assert.deepEqual(
    capture.screenshots.get("custom-fixed"),
    capture.screenshots.get("custom-fixed-again"),
    "Authored fixed paint must remain unchanged by caller color/fill/stroke props"
  )
}

async function assertPresentationParity(
  browserName: BrowserName,
  production: PresentationCapture,
  development: PresentationCapture
): Promise<void> {
  assertExpectedPresentation(production)
  assertExpectedPresentation(development)
  assert.deepEqual(
    production.styles,
    development.styles,
    `${browserName}: computed presentation styles differ between production and development`
  )
  const failureDirectory = path.join(root, "test-results/presentation-parity", browserName)
  await fs.rm(failureDirectory, { force: true, recursive: true })
  const mismatch = presentationCases.find((testId) => {
    const productionScreenshot = production.screenshots.get(testId)
    const developmentScreenshot = development.screenshots.get(testId)
    assert(productionScreenshot && developmentScreenshot, `Missing screenshot for ${testId}`)
    return !productionScreenshot.equals(developmentScreenshot)
  })
  if (!mismatch) {
    return
  }
  const productionScreenshot = production.screenshots.get(mismatch)
  const developmentScreenshot = development.screenshots.get(mismatch)
  assert(productionScreenshot && developmentScreenshot, `Missing screenshot for ${mismatch}`)
  await fs.mkdir(failureDirectory, { recursive: true })
  await Promise.all([
    fs.writeFile(path.join(failureDirectory, `${mismatch}-production.png`), productionScreenshot),
    fs.writeFile(path.join(failureDirectory, `${mismatch}-development.png`), developmentScreenshot),
  ])
  assert.fail(
    `${browserName} ${mismatch}: rendering differs between production and development; screenshots written to test-results/presentation-parity/${browserName}`
  )
}

// Each server owns its process group and cleanup, including failed assertions.
async function verifyServer(
  projectDir: string,
  mode: "start" | "dev",
  verify: (base: string) => Promise<void>
): Promise<void> {
  const port = await availablePort()
  const nextCli = path.join(projectDir, "node_modules/next/dist/bin/next")
  const child = spawn(
    process.execPath,
    [nextCli, mode, "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: projectDir,
      detached: process.platform !== "win32",
      env: { ...env, NODE_ENV: mode === "start" ? "production" : "development" },
      stdio: ["ignore", "pipe", "pipe"],
    }
  )
  let output = ""
  let processError: Error | undefined
  const append = (chunk: Buffer) => {
    output = (output + chunk).slice(-24_000)
  }
  child.stdout.on("data", append)
  child.stderr.on("data", append)
  child.on("error", (error) => {
    processError = error
  })
  const base = `http://127.0.0.1:${port}`

  try {
    const deadline = Date.now() + 180_000
    let ready = false
    while (Date.now() < deadline) {
      if (processError || child.exitCode !== null) {
        throw new Error(`Next ${mode} exited before readiness.\n${output}`, { cause: processError })
      }
      try {
        // biome-ignore lint/performance/noAwaitInLoops: Readiness probes must finish before the retry delay and next attempt.
        const response = await fetch(base, { signal: AbortSignal.timeout(5_000) })
        if (response.ok) {
          ready = true
          break
        }
      } catch {
        // Connection failures are expected while Next compiles and starts.
      }
      await delay(250)
    }
    assert(ready, `Next ${mode} did not become ready.\n${output}`)
    await verify(base)
  } finally {
    const pid = child.pid
    if (child.exitCode === null && pid) {
      const signal = (value: NodeJS.Signals) => {
        try {
          if (process.platform === "win32") {
            child.kill(value)
          } else {
            process.kill(-pid, value)
          }
        } catch (error) {
          if (!(error instanceof Error && "code" in error && error.code === "ESRCH")) {
            throw error
          }
        }
      }
      const exited = once(child, "exit")
      const killTimer = setTimeout(() => signal("SIGKILL"), 5_000)
      signal("SIGTERM")
      try {
        await exited
      } finally {
        clearTimeout(killTimer)
      }
    }
  }
}

const directory = await fs.mkdtemp(path.join(os.tmpdir(), "zero-icon-integration-"))
const browsers = new Map<BrowserName, Browser>()
try {
  const fixture: FixtureManifest = JSON.parse(
    await fs.readFile(path.join(fixturePath, "package.json"), "utf8")
  )
  const lock: PackageLock = JSON.parse(
    await fs.readFile(path.join(root, "package-lock.json"), "utf8")
  )
  const [packed]: PackedPackage[] = JSON.parse(
    run(["pack", "--json", "--ignore-scripts", "--pack-destination", directory], libraryPath)
  )
  const packedPaths = packed.files.map((file) => file.path)
  for (const required of [
    "dist/index.js",
    "dist/index.d.ts",
    "dist/LICENSE",
    "dist/build.js",
    "dist/react/icon.js",
    "dist/build/build-sprite-sheet.js",
    "dist/build/packaged-icons.js",
    "dist/command.js",
    "dist/icon-assets.json",
    "assets/catalog.json",
    "assets/licenses/lucide.txt",
    "assets/licenses/tabler.txt",
  ]) {
    assert(packedPaths.includes(required), `Packed package is missing ${required}`)
  }
  assert(
    !packedPaths.some((file) => repositoryOnlyPathPattern.test(file)),
    "Package contains repository-only files"
  )
  assert(
    !packedPaths.some((file) => rawArchivePathPattern.test(file)),
    "Package contains raw canonical SVG archives instead of the derived asset bundle"
  )

  await finishAll(
    [
      "app",
      "public",
      "next.config.ts",
      "postcss.config.mjs",
      "zero-ui.config.ts",
      "tsconfig.json",
    ].map((entry) =>
      fs.cp(path.join(fixturePath, entry), path.join(directory, entry), {
        filter: (source) => source !== path.join(fixturePath, "public/icons.svg"),
        recursive: true,
      })
    )
  )
  const dependencies: Record<string, string> = {}
  for (const name of Object.keys({ ...fixture.dependencies, ...fixture.devDependencies })) {
    if (name === "@react-zero-ui/icon-sprite") {
      continue
    }
    const entry =
      lock.packages[`fixtures/next-app/node_modules/${name}`] ??
      lock.packages[`node_modules/${name}`]
    assert(entry?.version, `No locked fixture dependency: ${name}`)
    dependencies[name] = entry.version
  }
  dependencies["@react-zero-ui/icon-sprite"] = `file:./${packed.filename}`
  await fs.writeFile(
    path.join(directory, "package.json"),
    JSON.stringify(
      {
        dependencies,
        name: "icon-sprite-package-test",
        private: true,
        scripts: { build: "next build" },
        type: "module",
      },
      null,
      2
    )
  )

  console.log("Installing the packed library in an isolated Next fixture...")
  run(["install", "--no-audit", "--no-fund"], directory)
  console.log("Building the production fixture and sprite...")
  run(["run", "build"], directory)
  const browserJavaScript = await readJavaScriptTree(path.join(directory, ".next/static/chunks"))
  assert.doesNotMatch(
    browserJavaScript,
    browserIconImplementationPattern,
    "Server Component icon implementations unexpectedly leaked into production client JavaScript"
  )
  assert.equal(
    (
      await fs.lstat(path.join(directory, "node_modules/@react-zero-ui/icon-sprite"))
    ).isSymbolicLink(),
    false,
    "Fixture unexpectedly uses a workspace symlink"
  )
  const installedManifest = JSON.parse(
    await fs.readFile(
      path.join(directory, "node_modules/@react-zero-ui/icon-sprite/package.json"),
      "utf8"
    )
  )
  assert.equal(
    installedManifest.dependencies?.["@react-zero-ui/icon-library"],
    undefined,
    "Published package unexpectedly depends on the private icon-library workspace"
  )
  for (const name of ["lucide-react", "lucide-static", "@tabler/icons", "@tabler/icons-react"]) {
    assert.equal(
      installedManifest.dependencies?.[name],
      undefined,
      `Unexpected consumer dependency: ${name}`
    )
  }

  for (const browserName of browserNames) {
    // biome-ignore lint/performance/noAwaitInLoops: Browser engines are launched serially to keep integration memory use predictable.
    browsers.set(browserName, await browserLaunchers[browserName]())
  }
  const productionPresentations = new Map<BrowserName, PresentationCapture>()
  await verifyServer(directory, "start", async (base) => {
    const spriteResponse = await fetch(`${base}/icons.svg`, { signal: AbortSignal.timeout(10_000) })
    assert.equal(spriteResponse.status, 200)
    const sprite = await spriteResponse.text()
    const symbols = new Set([...sprite.matchAll(spriteSymbolPattern)].map((match) => match[1]))
    await finishAll(
      ["/", "/zero-icon-sprite"].map(async (route) => {
        const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(30_000) })
        assert.equal(response.status, 200)
        const html = await response.text()
        const ids = [...html.matchAll(spriteReferencePattern)].map((match) => match[1])
        assert(ids.length > 0, `${route} has no production sprite references`)
        assert.doesNotMatch(
          html,
          inlinePathPattern,
          `${route} rendered inline icon paths instead of compact production sprite references`
        )
        for (const id of ids) {
          assert(symbols.has(id), `Missing sprite symbol: ${id}`)
        }
      })
    )
    for (const id of [
      "arrow-right",
      "tabler-accessible",
      "google-ads",
      "ai",
      "react-svgrepo-com",
    ]) {
      assert(symbols.has(id), `Missing required fixture symbol: ${id}`)
    }
    const comparison = await fetch(`${base}/lucid-react`, { signal: AbortSignal.timeout(30_000) })
    assert.equal(comparison.status, 200)
    assert.match(await comparison.text(), inlinePathPattern)
    for (const browserName of browserNames) {
      const browser = browsers.get(browserName)
      assert(browser, `Missing ${browserName} browser`)
      // biome-ignore lint/performance/noAwaitInLoops: Captures are serialized across engines to avoid concurrent screenshot variance and excess memory.
      const presentation = await capturePresentation(browser, base, "production")
      productionPresentations.set(browserName, presentation)
    }
  })
  await verifyServer(directory, "dev", async (base) => {
    const response = await fetch(base, { signal: AbortSignal.timeout(30_000) })
    const html = await response.text()
    assert.equal(response.status, 200)
    assert.match(html, inlinePathPattern, "Development icons should render inline SVG paths")
    assert.doesNotMatch(
      html,
      arrowRightSpritePattern,
      "Development ArrowRight unexpectedly uses the production sprite"
    )
    for (const browserName of browserNames) {
      const browser = browsers.get(browserName)
      const productionPresentation = productionPresentations.get(browserName)
      assert(browser, `Missing ${browserName} browser`)
      assert(productionPresentation, `${browserName}: production presentation capture did not run`)
      // biome-ignore lint/performance/noAwaitInLoops: Captures are serialized across engines to avoid concurrent screenshot variance and excess memory.
      const developmentPresentation = await capturePresentation(browser, base, "development")
      await assertPresentationParity(browserName, productionPresentation, developmentPresentation)
    }
  })
  console.log(
    "Passed: package contents, isolated install, production build, served sprite symbols, development rendering, and Chromium/Firefox/WebKit presentation parity."
  )
} finally {
  await Promise.all([...browsers.values()].map((browser) => browser.close()))
  await fs.rm(directory, { force: true, recursive: true })
}
