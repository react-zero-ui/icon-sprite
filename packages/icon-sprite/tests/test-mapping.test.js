import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { generateIcons } from "../scripts/generate-icons.ts"

const mapping = JSON.parse(
  readFileSync(new URL("../generated/component-sprite-map.json", import.meta.url), "utf8")
)
const compareText = (left, right) => left.localeCompare(right)
const exportPattern = /export \{ (\w+) \} from "([^"]+)";/g
const iconPropsExport = 'export type { IconProps } from "./render-use.js";'
const zeroUiConfigExport = 'export type { ZeroUIConfig } from "./config.js";'

test("every mapped icon has exactly one wrapper and public export", () => {
  const names = Object.keys(mapping)
  assert.ok(names.length > 0)
  assert.equal(new Set(names.map((name) => name.toLowerCase())).size, names.length)
  const files = readdirSync(new URL("../src/icons/", import.meta.url))
  assert.deepEqual(files.sort(compareText), names.map((name) => `${name}.tsx`).sort(compareText))
  const index = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8")
  const exports = [...index.matchAll(exportPattern)]
  assert.equal(exports.length, names.length + 1)
  assert.deepEqual(new Set(exports.map(([, name]) => name)), new Set([...names, "CustomIcon"]))
  for (const [, name, source] of exports) {
    assert.equal(source, name === "CustomIcon" ? "./custom-icon.js" : `./icons/${name}.js`)
  }
  assert.ok(index.includes(iconPropsExport))
  assert.ok(index.includes(zeroUiConfigExport))
})

test("generation is repeatable from another cwd and replaces only generated paths", (t) => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "zero-icons-generation-"))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const summary = generateIcons(directory)
  assert.equal(summary.icons, Object.keys(mapping).length)
  assert.deepEqual(
    JSON.parse(readFileSync(path.join(directory, "generated/component-sprite-map.json"), "utf8")),
    mapping
  )
  writeFileSync(path.join(directory, "src/custom-icon.tsx"), "manually maintained")
  function digest() {
    const hash = createHash("sha256")
    const files = readdirSync(directory, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.parentPath, entry.name))
      .sort(compareText)
    for (const file of files) {
      hash.update(path.relative(directory, file)).update("\0").update(readFileSync(file))
    }
    return hash.digest("hex")
  }
  const before = digest()
  writeFileSync(path.join(directory, "src/icons/Stale.tsx"), "stale")
  writeFileSync(path.join(directory, "src/lucide-archive/Stale.tsx"), "stale")
  const generator = new URL("../scripts/generate-icons.ts", import.meta.url).href
  execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `import { generateIcons } from ${JSON.stringify(generator)}; generateIcons(${JSON.stringify(directory)});`,
    ],
    { cwd: directory }
  )
  assert.equal(digest(), before)
  assert.equal(
    readFileSync(path.join(directory, "src/custom-icon.tsx"), "utf8"),
    "manually maintained"
  )
})
