import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { openCatalog, writeCatalog } from "../dist/catalog.js"
import { createProject, svg } from "./cli-fixtures.js"

test("manifest producer and consumer agree on assets, IDs, and legacy fallback names", (t) => {
  const directory = createProject(t)
  writeCatalog(directory, {
    mapping: {
      Check: { pack: "lucide", spriteId: "check", svgFile: "check.svg" },
      IconCheck: { pack: "tabler", spriteId: "tabler-check", svgFile: "check.svg" },
      Missing: { pack: "lucide", spriteId: "missing", svgFile: "missing.svg" },
    },
    lucideSvgs: { "check.svg": svg },
  })
  const resolve = openCatalog(directory)
  assert.equal(resolve("Check").svg, svg)
  assert.equal(resolve("IconCheck").id, "tabler-check")
  assert.ok(resolve("IconCheck").svg.includes("<svg"))
  assert.equal(resolve("Missing").svg, undefined)
  assert.equal(resolve("MyLogo").id, "my-logo")
  assert.equal(resolve("constructor").description, "custom: constructor.svg")
})

test("corrupt manifest entries fail at the storage boundary with useful paths", (t) => {
  const directory = createProject(t)
  writeCatalog(directory, { mapping: {}, lucideSvgs: {} })
  const mappingFile = path.join(directory, "generated/component-sprite-map.json")
  fs.writeFileSync(mappingFile, JSON.stringify({ Bad: { pack: "unknown", spriteId: 1 } }))
  assert.throws(
    () => openCatalog(directory),
    (error) => error instanceof Error && error.message.includes("component-sprite-map.json#Bad")
  )
  writeCatalog(directory, { mapping: {}, lucideSvgs: {} })
  fs.writeFileSync(path.join(directory, "generated/lucide-icons.json"), '{"bad.svg":42}')
  assert.throws(
    () => openCatalog(directory),
    (error) => error instanceof Error && error.message.includes("lucide-icons.json#bad.svg")
  )
})
