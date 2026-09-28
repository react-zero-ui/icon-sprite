import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { openCatalog, writeAssetBundle, writeCatalog } from "../dist/catalog.js"
import { createProject, svg } from "./cli-fixtures.js"

test("catalog resolves both package-owned packs and legacy custom fallback names", (t) => {
  const directory = createProject(t)
  writeCatalog(directory, {
    Check: { pack: "lucide", spriteId: "check", svgFile: "check.svg" },
    IconCheck: { pack: "tabler", spriteId: "tabler-check", svgFile: "check.svg" },
  })
  for (const pack of ["lucide", "tabler"]) {
    const archive = path.join(directory, "assets", pack)
    fs.mkdirSync(archive, { recursive: true })
    fs.writeFileSync(path.join(archive, "check.svg"), svg)
  }
  assert.equal(writeAssetBundle(directory), 2)

  const resolve = openCatalog(directory)
  assert.equal(resolve("Check").svg, svg)
  assert.equal(resolve("IconCheck").id, "tabler-check")
  assert.equal(resolve("IconCheck").svg, svg)
  assert.equal(resolve("MyLogo").id, "my-logo")
  assert.equal(resolve("constructor").description, "custom: constructor.svg")
})

test("corrupt catalog entries fail at the storage boundary with useful paths", (t) => {
  const directory = createProject(t)
  writeCatalog(directory, {})
  const catalogFile = path.join(directory, "assets/catalog.json")
  fs.writeFileSync(catalogFile, JSON.stringify({ Bad: { pack: "unknown", spriteId: 1 } }))
  assert.throws(
    () => openCatalog(directory),
    (error) => error instanceof Error && error.message.includes("assets/catalog.json#Bad")
  )
})
