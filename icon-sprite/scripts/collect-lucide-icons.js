#!/usr/bin/env node
/**
 * Copy the currently installed lucide-static SVGs into scripts/lucide-icons.
 *
 * Run this once per Lucide version, oldest to newest. Existing SVGs are left in
 * place, so removed icons stay available while current icons are refreshed.
 */
import fs from "fs";
import path from "path";

const sourceDir = path.resolve("node_modules/lucide-static/icons");
const outDir = path.resolve("scripts/lucide-icons");

if (!fs.existsSync(sourceDir)) {
	throw new Error(`lucide-static icons not found at ${sourceDir}`);
}

fs.mkdirSync(outDir, { recursive: true });

let copied = 0;
for (const file of fs.readdirSync(sourceDir)) {
	if (!file.endsWith(".svg")) continue;
	fs.copyFileSync(path.join(sourceDir, file), path.join(outDir, file));
	copied++;
}

console.log(`✅ Copied ${copied} Lucide SVGs to ${outDir}`);
