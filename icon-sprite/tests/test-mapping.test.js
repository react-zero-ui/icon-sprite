#!/usr/bin/env node
/**
 * Test: Verify icon wrapper generation is complete
 * 
 * Checks that:
 * 1. Wrappers exist for both Lucide and Tabler icons
 * 2. The count is reasonable (not empty, not way off)
 * 3. Lucide icons don't have "Icon" prefix
 * 4. Tabler icons do have "Icon" prefix
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_ICONS_DIR = path.resolve(__dirname, "../src/icons");
const LUCIDE_SVG_DIR = path.resolve(__dirname, "../node_modules/lucide-static/icons");
const TABLER_SVG_DIR = path.resolve(__dirname, "../node_modules/@tabler/icons/icons/outline");

// Get generated component names
function getGeneratedComponents() {
	if (!fs.existsSync(SRC_ICONS_DIR)) {
		throw new Error(`Missing dir: ${SRC_ICONS_DIR}. Run build first.`);
	}
	const exts = new Set([".tsx", ".jsx", ".ts", ".js"]);
	return fs
		.readdirSync(SRC_ICONS_DIR)
		.filter((f) => exts.has(path.extname(f)))
		.map((f) => path.basename(f, path.extname(f)))
		.filter((n) => n !== "CustomIcon" && n !== "index");
}

// Count SVGs in a directory
function countSvgs(dir) {
	if (!fs.existsSync(dir)) return 0;
	return fs.readdirSync(dir).filter((f) => f.endsWith(".svg")).length;
}

// Run test
const components = getGeneratedComponents();
const lucideSvgCount = countSvgs(LUCIDE_SVG_DIR);
const tablerSvgCount = countSvgs(TABLER_SVG_DIR);

// Separate Lucide and Tabler components
const lucideComponents = components.filter((c) => !c.startsWith("Icon"));
const tablerComponents = components.filter((c) => c.startsWith("Icon"));

console.log(`📊 Icon generation check:`);
console.log(`   Generated components: ${components.length}`);
console.log(`   - Lucide (no prefix): ${lucideComponents.length}`);
console.log(`   - Tabler (Icon prefix): ${tablerComponents.length}`);
console.log(`   Source SVGs:`);
console.log(`   - lucide-static: ${lucideSvgCount}`);
console.log(`   - @tabler/icons: ${tablerSvgCount}`);

let passed = true;

// Check 1: We have Lucide components
if (lucideComponents.length < 1000) {
	console.error(`\n❌ Too few Lucide components: ${lucideComponents.length} (expected 1500+)`);
	passed = false;
}

// Check 2: We have Tabler components  
if (tablerComponents.length < 3000) {
	console.error(`\n❌ Too few Tabler components: ${tablerComponents.length} (expected 4000+)`);
	passed = false;
}

// Check 3: Lucide components shouldn't exceed SVG count significantly
if (lucideComponents.length > lucideSvgCount + 50) {
	console.error(`\n❌ More Lucide components than SVGs: ${lucideComponents.length} vs ${lucideSvgCount}`);
	passed = false;
}

// Check 4: Tabler components shouldn't exceed SVG count significantly
if (tablerComponents.length > tablerSvgCount + 50) {
	console.error(`\n❌ More Tabler components than SVGs: ${tablerComponents.length} vs ${tablerSvgCount}`);
	passed = false;
}

// Check 5: Sample some Lucide icons exist
const sampleLucide = ["ArrowUp", "Check", "X", "Home", "Settings"];
const missingLucide = sampleLucide.filter((n) => !lucideComponents.includes(n));
if (missingLucide.length > 0) {
	console.error(`\n❌ Missing core Lucide icons: ${missingLucide.join(", ")}`);
	passed = false;
}

// Check 6: Sample some Tabler icons exist
const sampleTabler = ["IconArrowUp", "IconCheck", "IconX", "IconHome", "IconSettings"];
const missingTabler = sampleTabler.filter((n) => !tablerComponents.includes(n));
if (missingTabler.length > 0) {
	console.error(`\n❌ Missing core Tabler icons: ${missingTabler.join(", ")}`);
	passed = false;
}

if (passed) {
	console.log(`\n✅ Icon generation verified: ${components.length} components from 2 packs.`);
	process.exit(0);
} else {
	process.exit(1);
}
