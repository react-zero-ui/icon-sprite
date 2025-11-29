#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- mapper (same logic your lib uses) -------------------------------------
import { componentNameToStaticId } from "../dist/utils.js";
// --- locate dirs ------------------------------------------------------------
function resolveLucideStaticIconsDir() {
	const anyIcon = require.resolve("lucide-static/icons/arrow-up.svg");
	return path.dirname(anyIcon);
}

const SRC_ICONS_DIR = path.resolve(__dirname, "../src/icons");
const STATIC_DIR = resolveLucideStaticIconsDir();

// --- read component names from filenames -----------------------------------
function getReactIconComponentNames() {
	if (!fs.existsSync(SRC_ICONS_DIR)) {
		throw new Error(`Missing dir: ${SRC_ICONS_DIR}. Generate wrappers first.`);
	}
	const exts = new Set([".tsx", ".jsx", ".ts", ".js"]);
	return (
		fs
			.readdirSync(SRC_ICONS_DIR)
			.filter((f) => exts.has(path.extname(f)))
			.map((f) => path.basename(f, path.extname(f)))
			// exclude non-lucide helpers if present
			.filter((n) => n !== "CustomIcon" && n !== "index")
	);
}

// --- run checks -------------------------------------------------------------
const availableStatic = new Set(
	fs
		.readdirSync(STATIC_DIR)
		.filter((f) => f.endsWith(".svg"))
		.map((f) => f.slice(0, -4))
);

const reactNames = getReactIconComponentNames();
const missing = [];
for (const comp of reactNames) {
	const id = componentNameToStaticId(comp, availableStatic);
	if (!availableStatic.has(id)) missing.push(`${comp} -> ${id} (no svg)`);

	// format sanity
	if (!/^[a-z0-9-]+$/.test(id)) {
		missing.push(`${comp} -> ${id} (invalid chars)`);
		continue;
	}
	if (!availableStatic.has(id)) {
		missing.push(`${comp} -> ${id} (no svg)`);
	}
}

if (missing.length) {
	const sample = missing.slice(0, 50).join("\n  ");
	console.error(`❌ Mapping failures (${missing.length}):\n  ${sample}\n` + `Search path: ${STATIC_DIR}\n` + `Wrappers dir: ${SRC_ICONS_DIR}`);
	process.exit(1);
}
console.log(`✅ ${reactNames.length} components map to existing lucide-static SVGs.`);
