import assert from "node:assert/strict"
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { syncUpstreamIcons } from "../src/upstream-sync.ts"
import { validateUpstreamIcon } from "../src/upstream-validation.ts"

const packageDirectory = path.resolve(import.meta.dirname, "..")
const catalogFile = path.join(packageDirectory, "assets/catalog.json")
const catalog = JSON.parse(readFileSync(catalogFile, "utf8"))

test("every public icon resolves to a committed package-owned SVG", () => {
  assert.ok(Object.keys(catalog).length > 0)
  for (const [name, info] of Object.entries(catalog)) {
    const file = path.join(packageDirectory, "assets", info.pack, info.svgFile)
    assert.equal(existsSync(file), true, `${name}: ${info.pack}/${info.svgFile}`)
    const markup = readFileSync(file, "utf8")
    assert.ok(markup.includes("<svg"), name)
    validateUpstreamIcon(markup, `${info.pack}/${info.svgFile}`)
  }
})

test("built-in presentation validation rejects inheritance-breaking upstream SVGs", () => {
  const root =
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
  assert.doesNotThrow(() =>
    validateUpstreamIcon(`<svg ${root}><path d="M0 0h1"/></svg>`, "valid.svg")
  )
  for (const [source, markup] of [
    ["missing.svg", `<svg ${root.replace('fill="none" ', "")}><path d="M0 0h1"/></svg>`],
    [
      "different.svg",
      `<svg ${root.replace('stroke="currentColor"', 'stroke="red"')}><path d="M0 0h1"/></svg>`,
    ],
    ["root-style.svg", `<svg ${root} style="stroke: red"><path d="M0 0h1"/></svg>`],
    ["descendant.svg", `<svg ${root}><path stroke-width="1" d="M0 0h1"/></svg>`],
    ["descendant-style.svg", `<svg ${root}><path style="stroke-width: 1" d="M0 0h1"/></svg>`],
  ]) {
    assert.throws(
      () => validateUpstreamIcon(markup, source),
      (error) => error instanceof Error && error.message.includes(source)
    )
  }
})

test("manual sync refreshes current assets without deleting historical files or identities", (t) => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "zero-icons-sync-"))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  mkdirSync(path.join(directory, "assets/lucide"), { recursive: true })
  mkdirSync(path.join(directory, "assets/tabler"), { recursive: true })
  copyFileSync(catalogFile, path.join(directory, "assets/catalog.json"))
  writeFileSync(path.join(directory, "assets/lucide/retired-test-icon.svg"), "historical lucide")
  writeFileSync(path.join(directory, "assets/tabler/retired-test-icon.svg"), "historical tabler")

  const summary = syncUpstreamIcons(directory)

  assert.equal(summary.added, 0)
  assert.deepEqual(
    JSON.parse(readFileSync(path.join(directory, "assets/catalog.json"), "utf8")),
    catalog
  )
  assert.equal(
    readFileSync(path.join(directory, "assets/lucide/retired-test-icon.svg"), "utf8"),
    "historical lucide"
  )
  assert.equal(
    readFileSync(path.join(directory, "assets/tabler/retired-test-icon.svg"), "utf8"),
    "historical tabler"
  )
  assert.equal(existsSync(path.join(directory, "assets/licenses/lucide.txt")), true)
  assert.equal(existsSync(path.join(directory, "assets/licenses/tabler.txt")), true)
})

test("sync preserves a published icon after upstream removes it", (t) => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "zero-icons-removed-upstream-"))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const archive = path.join(directory, "assets/lucide")
  mkdirSync(archive, { recursive: true })
  mkdirSync(path.join(directory, "assets/tabler"), { recursive: true })

  const historicalIcon = {
    pack: "lucide",
    spriteId: "retired-test-icon",
    svgFile: "retired-test-icon.svg",
  }
  const historicalCatalog = { ...catalog, RetiredTestIcon: historicalIcon }
  writeFileSync(
    path.join(directory, "assets/catalog.json"),
    `${JSON.stringify(historicalCatalog, null, 2)}\n`
  )
  writeFileSync(
    path.join(archive, historicalIcon.svgFile),
    '<svg viewBox="0 0 24 24"><path d="M1 1h1"/></svg>'
  )

  syncUpstreamIcons(directory)

  const syncedCatalog = JSON.parse(
    readFileSync(path.join(directory, "assets/catalog.json"), "utf8")
  )
  assert.deepEqual(syncedCatalog.RetiredTestIcon, historicalIcon)
  assert.equal(
    readFileSync(path.join(archive, historicalIcon.svgFile), "utf8"),
    '<svg viewBox="0 0 24 24"><path d="M1 1h1"/></svg>'
  )
})

test("upstream icon packages belong only to the private icon-library workspace", () => {
  const manifest = JSON.parse(readFileSync(path.join(packageDirectory, "package.json"), "utf8"))
  for (const name of ["lucide-react", "lucide-static", "@tabler/icons", "@tabler/icons-react"]) {
    assert.equal(manifest.dependencies?.[name], undefined, name)
    assert.equal(typeof manifest.devDependencies?.[name], "string", name)
  }
  const productManifest = JSON.parse(
    readFileSync(path.resolve(packageDirectory, "../icon-sprite/package.json"), "utf8")
  )
  for (const name of ["lucide-react", "lucide-static", "@tabler/icons", "@tabler/icons-react"]) {
    assert.equal(productManifest.dependencies?.[name], undefined, name)
    assert.equal(productManifest.devDependencies?.[name], undefined, name)
  }
})
