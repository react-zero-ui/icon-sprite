import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { openPackagedIcons } from "../dist/build/packaged-icons.js"
import { writeCanonicalCatalog, writePackagedIconData } from "../icon-library/catalog.ts"
import { createProject, svg } from "./cli-fixtures.js"

test("packaged data resolves both icon packs without canonical SVG archives", (t) => {
  const directory = createProject(t)
  writeCanonicalCatalog(directory, {
    Check: { pack: "lucide", spriteId: "check", svgFile: "check.svg" },
    IconCheck: { pack: "tabler", spriteId: "tabler-check", svgFile: "check.svg" },
  })
  for (const pack of ["lucide", "tabler"]) {
    const archive = path.join(directory, "assets", pack)
    fs.mkdirSync(archive, { recursive: true })
    fs.writeFileSync(path.join(archive, "check.svg"), svg)
  }
  assert.equal(writePackagedIconData(directory), 2)

  // Installed consumers receive the bundle, so lookup must survive without either archive.
  for (const pack of ["lucide", "tabler"]) {
    fs.rmSync(path.join(directory, "assets", pack), { recursive: true })
  }

  const resolve = openPackagedIcons(directory)
  assert.equal(resolve("Check").svg, svg)
  assert.equal(resolve("IconCheck").id, "tabler-check")
  assert.equal(resolve("IconCheck").svg, svg)
  assert.equal(resolve("MyLogo").id, "my-logo")
  assert.equal(resolve("constructor").description, "custom: constructor.svg")
})

test("corrupt catalog entries fail at the storage boundary with useful paths", (t) => {
  const directory = createProject(t)
  writeCanonicalCatalog(directory, {})
  const catalogFile = path.join(directory, "assets/catalog.json")
  fs.writeFileSync(catalogFile, JSON.stringify({ Bad: { pack: "unknown", spriteId: 1 } }))
  assert.throws(
    () => openPackagedIcons(directory),
    (error) => error instanceof Error && error.message.includes("assets/catalog.json#Bad")
  )
})
