import { execFileSync } from "node:child_process"
import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const packageDir = fileURLToPath(new URL("../", import.meta.url))

// Generation owns every derived source and manifest; compilation owns dist.
execFileSync(process.execPath, [fileURLToPath(new URL("generate-icons.ts", import.meta.url))], {
  cwd: packageDir,
  stdio: "inherit",
})
fs.rmSync(new URL("../dist/", import.meta.url), { recursive: true, force: true })
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
fs.chmodSync(new URL("../dist/cli/index.js", import.meta.url), 0o755)
