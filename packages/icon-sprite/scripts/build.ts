import { execFileSync } from "node:child_process"
import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { writePackagedIconData } from "../icon-library/catalog.ts"
import { generateIconComponents } from "../icon-library/component-generation.ts"

const require = createRequire(import.meta.url)
const packageDir = fileURLToPath(new URL("../", import.meta.url))

// Generation owns derived React source; compilation owns dist.
const { icons, sourceSvgs } = generateIconComponents()
console.log(`Generated ${icons} icons from ${sourceSvgs} package-owned SVGs.`)
fs.rmSync(new URL("../dist/", import.meta.url), { recursive: true, force: true })
const compilerPackage = require.resolve("typescript/package.json")
const compiler: { bin: { tsc: string } } = JSON.parse(fs.readFileSync(compilerPackage, "utf8"))
const compilerBin = path.resolve(path.dirname(compilerPackage), compiler.bin.tsc)
execFileSync(process.execPath, [compilerBin, "-p", packageDir], {
  cwd: packageDir,
  stdio: "inherit",
})
writePackagedIconData(packageDir)
fs.copyFileSync(
  new URL("../../../LICENSE", import.meta.url),
  new URL("../dist/LICENSE", import.meta.url)
)
// Workspace bin links target this regenerated file directly.
fs.chmodSync(new URL("../dist/command.js", import.meta.url), 0o755)
