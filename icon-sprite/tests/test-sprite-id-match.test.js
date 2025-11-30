#!/usr/bin/env node
/**
 * Test: Verify sprite IDs in wrapper components match the mapping file
 * 
 * This prevents silent failures where the wrapper uses a different sprite ID
 * than what build-sprite.js will generate.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist/icons");
const MAPPING_FILE = path.resolve(__dirname, "../scripts/component-sprite-map.json");

// Load the mapping
if (!fs.existsSync(MAPPING_FILE)) {
	console.error("❌ component-sprite-map.json not found. Run `npm run build` first.");
	process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf8"));

// Extract sprite IDs from compiled wrapper files
function extractSpriteIdFromWrapper(filePath) {
	const content = fs.readFileSync(filePath, "utf8");
	// Match: renderUse("sprite-id", ...)
	const match = content.match(/renderUse\("([^"]+)"/);
	return match ? match[1] : null;
}

let passed = 0;
let failed = 0;
const failures = [];

const files = fs.readdirSync(DIST_DIR).filter(f => f.endsWith(".js") && f !== "index.js");

for (const file of files) {
	const componentName = file.replace(".js", "");
	const filePath = path.join(DIST_DIR, file);
	
	const wrapperSpriteId = extractSpriteIdFromWrapper(filePath);
	const mappingSpriteId = mapping[componentName]?.spriteId;
	
	if (!wrapperSpriteId) {
		// Not all components use renderUse (e.g., CustomIcon)
		continue;
	}
	
	if (!mappingSpriteId) {
		failures.push(`${componentName}: Not in mapping`);
		failed++;
		continue;
	}
	
	if (wrapperSpriteId !== mappingSpriteId) {
		failures.push(`${componentName}: wrapper="${wrapperSpriteId}" vs mapping="${mappingSpriteId}"`);
		failed++;
	} else {
		passed++;
	}
}

console.log(`\n📊 Sprite ID Match Test`);
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);

if (failures.length > 0) {
	console.log(`\n❌ Mismatches found:`);
	failures.slice(0, 20).forEach(f => console.log(`   - ${f}`));
	if (failures.length > 20) {
		console.log(`   ... and ${failures.length - 20} more`);
	}
	process.exit(1);
}

console.log(`\n✅ All ${passed} sprite IDs match between wrappers and mapping!`);
process.exit(0);
