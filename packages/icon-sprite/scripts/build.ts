import { execFileSync } from "node:child_process"
import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const packageDir = fileURLToPath(new URL("../", import.meta.url))
const generator = fileURLToPath(
  new URL("../../icon-library/src/component-generation.ts", import.meta.url)
)

fs.rmSync(new URL("../dist/", import.meta.url), { recursive: true, force: true })
// Private icon-library generation owns React source and package-ready icon data.
execFileSync(process.execPath, [generator], {
  cwd: packageDir,
  stdio: "inherit",
})
const compilerPackage = require.resolve("typescript/package.json")
const compiler: { bin: { tsc: string } } = JSON.parse(fs.readFileSync(compilerPackage, "utf8"))
const compilerBin = path.resolve(path.dirname(compilerPackage), compiler.bin.tsc)
execFileSync(process.execPath, [compilerBin, "-p", packageDir], {
  cwd: packageDir,
  stdio: "inherit",
})
fs.copyFileSync(
  new URL("../../../LICENSE", import.meta.url),
  new URL("../dist/LICENSE", import.meta.url)
)
// Workspace bin links target this regenerated file directly.
fs.chmodSync(new URL("../dist/command.js", import.meta.url), 0o755)
