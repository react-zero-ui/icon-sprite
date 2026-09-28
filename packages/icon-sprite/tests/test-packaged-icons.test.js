import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { openPackagedIcons } from "../dist/build/packaged-icons.js"
import { createProject, svg } from "./cli-fixtures.js"

test("packaged data resolves both icon packs without canonical SVG archives", (t) => {
  const directory = createProject(t)
  const catalog = {
    Check: { pack: "lucide", spriteId: "check", svgFile: "check.svg" },
    IconCheck: { pack: "tabler", spriteId: "tabler-check", svgFile: "check.svg" },
  }
  fs.mkdirSync(path.join(directory, "assets"), { recursive: true })
  fs.mkdirSync(path.join(directory, "dist"), { recursive: true })
  fs.writeFileSync(path.join(directory, "assets/catalog.json"), JSON.stringify(catalog))
  fs.writeFileSync(
    path.join(directory, "dist/icon-assets.json"),
    JSON.stringify({ "lucide/check.svg": svg, "tabler/check.svg": svg })
  )

  const resolve = openPackagedIcons(directory)
  assert.equal(resolve("Check").svg, svg)
  assert.equal(resolve("IconCheck").id, "tabler-check")
  assert.equal(resolve("IconCheck").svg, svg)
  assert.equal(resolve("MyLogo").id, "my-logo")
  assert.equal(resolve("constructor").description, "custom: constructor.svg")
})

test("corrupt catalog entries fail at the storage boundary with useful paths", (t) => {
  const directory = createProject(t)
  fs.mkdirSync(path.join(directory, "assets"), { recursive: true })
  fs.mkdirSync(path.join(directory, "dist"), { recursive: true })
  fs.writeFileSync(path.join(directory, "dist/icon-assets.json"), "{}")
  const catalogFile = path.join(directory, "assets/catalog.json")
  fs.writeFileSync(catalogFile, JSON.stringify({ Bad: { pack: "unknown", spriteId: 1 } }))
  assert.throws(
    () => openPackagedIcons(directory),
    (error) => error instanceof Error && error.message.includes("assets/catalog.json#Bad")
  )
})
