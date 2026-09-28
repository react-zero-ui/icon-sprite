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
import { syncIcons } from "../scripts/sync-icons.ts"

const packageDirectory = path.resolve(import.meta.dirname, "..")
const catalogFile = path.join(packageDirectory, "assets/catalog.json")
const catalog = JSON.parse(readFileSync(catalogFile, "utf8"))

test("every public icon resolves to a committed package-owned SVG", () => {
  assert.ok(Object.keys(catalog).length > 0)
  for (const [name, info] of Object.entries(catalog)) {
    const file = path.join(packageDirectory, "assets", info.pack, info.svgFile)
    assert.equal(existsSync(file), true, `${name}: ${info.pack}/${info.svgFile}`)
    assert.ok(readFileSync(file, "utf8").includes("<svg"), name)
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

  const summary = syncIcons(directory)

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

test("upstream icon packages are maintainer-only dependencies", () => {
  const manifest = JSON.parse(readFileSync(path.join(packageDirectory, "package.json"), "utf8"))
  for (const name of ["lucide-react", "lucide-static", "@tabler/icons", "@tabler/icons-react"]) {
    assert.equal(manifest.dependencies?.[name], undefined, name)
    assert.equal(typeof manifest.devDependencies?.[name], "string", name)
  }
})
