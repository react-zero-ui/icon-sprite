import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"

test("the complete React entrypoint graph stays independent of Node build machinery", () => {
  const directory = fileURLToPath(new URL("../dist/", import.meta.url))
  const visited = new Set()
  const runtimeDependencies = new Set(["react", "react/jsx-runtime", "@tabler/icons-react"])

  function inspect(file) {
    if (visited.has(file)) {
      return
    }
    visited.add(file)
    const ast = parse(fs.readFileSync(file, "utf8"), { sourceType: "module" })
    function follow(specifier) {
      if (!specifier.startsWith(".")) {
        assert(runtimeDependencies.has(specifier), `Runtime imports ${specifier} through ${file}`)
        return
      }
      const target = path.resolve(path.dirname(file), specifier)
      assert(target.startsWith(directory), `Runtime escapes its package: ${target}`)
      assert(
        !target.startsWith(path.join(directory, "build")),
        `Runtime includes build module: ${target}`
      )
      assert.notEqual(target, path.join(directory, "catalog.js"))
      assert.notEqual(target, path.join(directory, "command.js"))
      inspect(target)
    }
    traverse(ast, {
      ImportDeclaration(node) {
        follow(node.node.source.value)
      },
      ExportAllDeclaration(node) {
        follow(node.node.source.value)
      },
      ExportNamedDeclaration(node) {
        if (node.node.source) {
          follow(node.node.source.value)
        }
      },
      ImportExpression(node) {
        if (node.node.source.type === "StringLiteral") {
          follow(node.node.source.value)
        }
      },
    })
  }
  inspect(path.join(directory, "index.js"))
  assert(
    visited.has(path.join(directory, "runtime/custom-icon-dev.js")),
    "Inspect lazy runtime dependencies too"
  )
})
