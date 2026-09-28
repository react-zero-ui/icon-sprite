import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"

test("the complete React entrypoint graph stays independent of Node build machinery", () => {
  const directory = fileURLToPath(new URL("../dist/", import.meta.url))
  const dynamicDependencies = new Set()
  const staticDependencies = new Set()
  const visited = new Set()
  const reactDependencies = new Set(["react", "react/jsx-runtime"])

  function inspect(file) {
    if (visited.has(file)) {
      return
    }
    visited.add(file)
    const ast = parse(fs.readFileSync(file, "utf8"), { sourceType: "module" })
    function follow(specifier, dependencies) {
      if (!specifier.startsWith(".")) {
        assert(
          reactDependencies.has(specifier),
          `React entrypoint imports ${specifier} through ${file}`
        )
        return
      }
      const target = path.resolve(path.dirname(file), specifier)
      dependencies.add(target)
      assert(target.startsWith(directory), `React entrypoint escapes its package: ${target}`)
      assert(
        !target.startsWith(path.join(directory, "build")),
        `React entrypoint includes build module: ${target}`
      )
      assert(
        !target.startsWith(path.join(directory, "runtime")),
        `React entrypoint includes legacy runtime module: ${target}`
      )
      assert.notEqual(target, path.join(directory, "catalog.js"))
      assert.notEqual(target, path.join(directory, "command.js"))
      inspect(target)
    }
    traverse(ast, {
      ImportDeclaration(node) {
        follow(node.node.source.value, staticDependencies)
      },
      ExportAllDeclaration(node) {
        follow(node.node.source.value, staticDependencies)
      },
      ExportNamedDeclaration(node) {
        if (node.node.source) {
          follow(node.node.source.value, staticDependencies)
        }
      },
      ImportExpression(node) {
        if (node.node.source.type === "StringLiteral") {
          follow(node.node.source.value, dynamicDependencies)
        }
      },
    })
  }
  inspect(path.join(directory, "index.js"))
  const developmentLoader = path.join(directory, "react", "custom-icon-dev.js")
  for (const file of ["icon.js", "custom-icon.js", "custom-icon-dev.js"]) {
    assert(visited.has(path.join(directory, "react", file)), `Inspect React module ${file}`)
  }
  assert(dynamicDependencies.has(developmentLoader), "Load development custom icons lazily")
  assert(!staticDependencies.has(developmentLoader), "Keep development custom icons tree-shakeable")
})
