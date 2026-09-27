import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { pathToFileURL } from "node:url"
import { resolveTablerIconsDir } from "../scripts/resolve-icon-pack.ts"

test("Tabler SVGs resolve through the installed package export map", () => {
  const require = createRequire(import.meta.url)
  const checkFile = path.join(resolveTablerIconsDir(), "check.svg")
  assert.equal(checkFile, require.resolve("@tabler/icons/outline/check.svg"))
  assert.ok(readFileSync(checkFile, "utf8").includes("<svg"))
})

test("SVG resolution supports hoisted dependencies, export remapping and an unrelated cwd", (t) => {
  const directory = realpathSync(mkdtempSync(path.join(os.tmpdir(), "zero-icons-hoisted-")))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const consumer = path.join(directory, "packages/consumer")
  mkdirSync(consumer, { recursive: true })
  const resolver = path.join(consumer, "resolve-icon-pack.mts")
  copyFileSync(new URL("../scripts/resolve-icon-pack.ts", import.meta.url), resolver)
  // These are fake parent-workspace dependencies, not package-local fixtures.
  for (const [name, subpath] of [
    ["@tabler/icons", "outline"],
    ["lucide-static", "icons"],
  ]) {
    const dependency = path.join(directory, "node_modules", name)
    mkdirSync(path.join(dependency, "exported-svgs"), { recursive: true })
    writeFileSync(
      path.join(dependency, "package.json"),
      JSON.stringify({ name, exports: { [`./${subpath}/*.svg`]: "./exported-svgs/*.svg" } })
    )
    writeFileSync(path.join(dependency, "exported-svgs/check.svg"), "<svg />")
  }
  const script = `import { resolveTablerIconsDir, resolveLucideIconsDir } from ${JSON.stringify(pathToFileURL(resolver).href)}; console.log(JSON.stringify([resolveTablerIconsDir(), resolveLucideIconsDir()]));`
  const result = execFileSync(process.execPath, ["--input-type=module", "-e", script], {
    cwd: os.tmpdir(),
    encoding: "utf8",
  })
  assert.deepEqual(JSON.parse(result), [
    path.join(directory, "node_modules/@tabler/icons/exported-svgs"),
    path.join(directory, "node_modules/lucide-static/exported-svgs"),
  ])
})
