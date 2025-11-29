// scripts/gen-dist-index.js
import fs from "fs";
import path from "path";

const __dirname = path.resolve(process.cwd());

const distDir = path.join(__dirname, "dist");
const iconsDir = path.join(distDir, "icons");
const jsOut = path.join(distDir, "index.js");
const dtsOut = path.join(distDir, "index.d.ts");

// 1. Find every compiled icon wrapper
const files = fs.readdirSync(iconsDir).filter((f) => f.endsWith(".js") && f !== "index.js");
// 2. Build the JS barrel (icons only - types don't exist at runtime)
const jsLines = files.map((file) => {
	const name = path.basename(file, ".js");
	return `export { ${name} } from "./icons/${name}.js";`;
});

// 3. Build the TS declaration barrel (icons + type export)
const dtsLines = files.map((file) => {
	const name = path.basename(file, ".js");
	return `export { ${name} } from "./icons/${name}";`;
});
// Re-export ZeroUIConfig type for user config files (type-only, .d.ts only)
dtsLines.push(`export type { ZeroUIConfig } from "./config";`);

// 4. Write both barrels
fs.writeFileSync(jsOut, jsLines.join("\n") + "\n", "utf8");
fs.writeFileSync(dtsOut, dtsLines.join("\n") + "\n", "utf8");

console.log(`✅ Wrote ${files.length} icons to dist/index.js and dist/index.d.ts`);
