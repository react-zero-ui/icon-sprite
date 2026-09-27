import assert from "node:assert/strict"
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { collectLucideIcons } from "../scripts/collect-lucide-icons.ts"
import { LUCIDE_ARCHIVE_DIR } from "../scripts/icon-catalog.ts"
import { resolveLucideIconsDir } from "../scripts/resolve-icon-pack.ts"

const require = createRequire(import.meta.url)
const mapping = JSON.parse(
  readFileSync(new URL("../generated/component-sprite-map.json", import.meta.url), "utf8")
)

test("every archived SVG is preserved in the manifest and mapped or explicitly skipped", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../generated/lucide-icons.json", import.meta.url), "utf8")
  )
  const skipped = JSON.parse(
    readFileSync(new URL("../generated/skipped-icons.json", import.meta.url), "utf8")
  )
  const files = readdirSync(LUCIDE_ARCHIVE_DIR)
    .filter((file) => file.endsWith(".svg"))
    .sort()
  assert.deepEqual(Object.keys(manifest).sort(), files)
  for (const file of files) {
    assert.equal(manifest[file], readFileSync(path.join(LUCIDE_ARCHIVE_DIR, file), "utf8"))
  }
  const mapped = Object.entries(mapping).filter(([, info]) => info.pack === "lucide")
  const skippedLucide = skipped.filter((info) => info.pack === "lucide")
  assert.deepEqual(
    [
      ...mapped.map(([, info]) => info.svgFile),
      ...skippedLucide.map((info) => `${info.svgId}.svg`),
    ].sort(),
    files
  )
  for (const { componentName, collidesWith, reason } of skippedLucide) {
    assert.equal(reason, "case-collision")
    assert.equal(componentName.toLowerCase(), collidesWith.name.toLowerCase())
    assert.equal(mapping[collidesWith.name].pack, collidesWith.pack)
  }
  const components = readdirSync(new URL("../src/lucide-archive/", import.meta.url))
  assert.deepEqual(components.sort(), mapped.map(([name]) => `${name}.tsx`).sort())
  for (const [name] of mapped) {
    const source = readFileSync(new URL(`../src/icons/${name}.tsx`, import.meta.url), "utf8")
    assert.ok(source.includes(`from "../lucide-archive/${name}.js"`), name)
    assert.ok(!source.includes("lucide-react"), name)
  }
})

test("current canonical Lucide names and historical IDs remain available", () => {
  const packageFile = require.resolve("lucide-react/package.json")
  const metadata = JSON.parse(readFileSync(packageFile, "utf8"))
  const declarations = readFileSync(
    path.resolve(path.dirname(packageFile), metadata.types ?? metadata.typings),
    "utf8"
  )
  const names = [
    ...declarations.matchAll(
      /declare const (\w+): (?:LucideIcon\b|react\.ForwardRefExoticComponent\b)/g
    ),
  ]
    .map(([, name]) => name)
    .filter((name) => !name.startsWith("Lucide") && !name.endsWith("Icon"))
  assert.ok(names.length > 0)
  for (const name of names) {
    assert.equal(mapping[name]?.pack, "lucide", name)
  }
  for (const [name, spriteId] of Object.entries({
    ArrowDownAZ: "arrow-down-a-z",
    Axis3d: "axis-3-d",
    Grid2x2: "grid-2-x-2",
    Home: "home",
    House: "house",
    Ad: "ad",
  })) {
    assert.deepEqual(mapping[name], { pack: "lucide", spriteId, svgFile: `${spriteId}.svg` })
  }
})

test("collection refreshes installed SVG bytes without deleting historical files or generating code", (t) => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "zero-icons-archive-"))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  writeFileSync(path.join(directory, "retired-test-icon.svg"), "historical SVG bytes")
  writeFileSync(path.join(directory, "check.svg"), "old SVG bytes")
  const sourceDir = resolveLucideIconsDir()
  const files = readdirSync(sourceDir).filter((file) => file.endsWith(".svg"))
  assert.equal(collectLucideIcons(directory), files.length)
  assert.deepEqual(readdirSync(directory).sort(), [...files, "retired-test-icon.svg"].sort())
  assert.equal(
    readFileSync(path.join(directory, "retired-test-icon.svg"), "utf8"),
    "historical SVG bytes"
  )
  for (const file of files) {
    assert.deepEqual(
      readFileSync(path.join(directory, file)),
      readFileSync(path.join(sourceDir, file))
    )
  }
})
