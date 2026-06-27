#!/usr/bin/env node
/**
 * Test: Verify this library is a drop-in replacement for lucide-react
 * 
 * Ensures users can change:
 *   import { ArrowUp, Check } from "lucide-react";
 * To:
 *   import { ArrowUp, Check } from "@react-zero-ui/icon-sprite";
 * 
 * Without changing any component names.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get export names from this library's index.d.ts
function getOurExports() {
	const indexDts = path.resolve(__dirname, "../dist/index.d.ts");
	if (!fs.existsSync(indexDts)) {
		throw new Error("dist/index.d.ts not found. Run build first.");
	}
	const content = fs.readFileSync(indexDts, "utf8");
	// Match: export { ComponentName } from "./icons/ComponentName";
	const matches = content.matchAll(/export \{ (\w+) \}/g);
	return new Set([...matches].map((m) => m[1]));
}

// Get export names from lucide-react
function getLucideReactExports() {
	const lucideDts = path.resolve(__dirname, "../node_modules/lucide-react/dist/lucide-react.d.ts");
	if (!fs.existsSync(lucideDts)) {
		throw new Error("lucide-react types not found. Run npm install first.");
	}
	const content = fs.readFileSync(lucideDts, "utf8");
	
	// lucide-react exports icons as: declare const IconName: react.ForwardRefExoticComponent
	// We want icon component names (PascalCase, not prefixed with Lucide or suffixed with Icon)
	const iconExports = new Set();
	
	const matches = content.matchAll(/declare const (\w+): react\.ForwardRefExoticComponent/g);
	for (const match of matches) {
		const name = match[1];
		// Skip aliases (LucideX, XIcon variants) - just get base names
		if (!name.startsWith("Lucide") && !name.endsWith("Icon")) {
			iconExports.add(name);
		}
	}
	
	return iconExports;
}

function getArchivedLucideSvgFiles() {
	const iconsDir = path.resolve(__dirname, "../scripts/lucide-icons");
	if (!fs.existsSync(iconsDir)) return new Set();

	return new Set(
		fs.readdirSync(iconsDir)
			.filter((file) => file.endsWith(".svg"))
	);
}

function getSkippedLucideSvgFiles() {
	const skippedFile = path.resolve(__dirname, "../scripts/skipped-icons.json");
	if (!fs.existsSync(skippedFile)) return new Set();

	const skipped = JSON.parse(fs.readFileSync(skippedFile, "utf8"));
	return new Set(
		skipped
			.filter((item) => item.pack === "lucide")
			.map((item) => `${item.svgId}.svg`)
	);
}

function getLucideSpriteMapping() {
	const mappingFile = path.resolve(__dirname, "../scripts/component-sprite-map.json");
	if (!fs.existsSync(mappingFile)) {
		throw new Error("component-sprite-map.json not found. Run build first.");
	}

	const mapping = JSON.parse(fs.readFileSync(mappingFile, "utf8"));
	const bySvgFile = new Map();
	for (const [componentName, info] of Object.entries(mapping)) {
		if (info.pack === "lucide") {
			bySvgFile.set(info.svgFile, componentName);
		}
	}
	return bySvgFile;
}

// Run the test
try {
	const ourExports = getOurExports();
	const lucideExports = getLucideReactExports();
	const archivedLucideSvgFiles = getArchivedLucideSvgFiles();
	const skippedLucideSvgFiles = getSkippedLucideSvgFiles();
	const lucideMapping = getLucideSpriteMapping();
	
	// Find icons in lucide-react that we don't have
	const missing = [];
	for (const name of lucideExports) {
		if (!ourExports.has(name)) {
			missing.push(name);
		}
	}

	const missingArchived = [];
	for (const svgFile of archivedLucideSvgFiles) {
		if (skippedLucideSvgFiles.has(svgFile)) continue;

		const componentName = lucideMapping.get(svgFile);
		if (!componentName || !ourExports.has(componentName)) {
			missingArchived.push(svgFile);
		}
	}
	
	// Find icons we have that lucide-react doesn't (extras - not a problem)
	const extras = [];
	for (const name of ourExports) {
		if (!lucideExports.has(name) && name !== "ZeroUIConfig" && name !== "CustomIcon") {
			extras.push(name);
		}
	}
	
	console.log(`📊 Export comparison:`);
	console.log(`   lucide-react exports: ${lucideExports.size} icons`);
	console.log(`   archived Lucide SVGs: ${archivedLucideSvgFiles.size} icons`);
	console.log(`   Our library exports:  ${ourExports.size} items (icons + types)`);
	
	if (missing.length > 0) {
		console.error(`\n❌ Missing ${missing.length} icons that lucide-react exports:`);
		console.error(`   ${missing.slice(0, 20).join(", ")}${missing.length > 20 ? "..." : ""}`);
		console.error(`\n   Users importing these from lucide-react won't find them in our library.`);
		process.exit(1);
	}

	if (missingArchived.length > 0) {
		console.error(`\n❌ Missing ${missingArchived.length} archived Lucide icons:`);
		console.error(`   ${missingArchived.slice(0, 20).join(", ")}${missingArchived.length > 20 ? "..." : ""}`);
		console.error(`\n   Users importing these from older lucide-react versions won't find them in our library.`);
		process.exit(1);
	}
	
	if (extras.length > 0) {
		console.log(`   Extra exports: ${extras.length} (CustomIcon, types, etc.)`);
	}
	
	console.log(`\n✅ All ${lucideExports.size} lucide-react icons are available.`);
	if (archivedLucideSvgFiles.size > 0) {
		console.log(`   All ${archivedLucideSvgFiles.size - skippedLucideSvgFiles.size} archived Lucide SVGs are mapped to exports.`);
	}
	console.log(`   Drop-in replacement supported! ✨`);
	
} catch (e) {
	console.error(`❌ Test failed: ${e.message}`);
	process.exit(1);
}
