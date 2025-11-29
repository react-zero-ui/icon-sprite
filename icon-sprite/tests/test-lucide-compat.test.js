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

// Run the test
try {
	const ourExports = getOurExports();
	const lucideExports = getLucideReactExports();
	
	// Find icons in lucide-react that we don't have
	const missing = [];
	for (const name of lucideExports) {
		if (!ourExports.has(name)) {
			missing.push(name);
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
	console.log(`   Our library exports:  ${ourExports.size} items (icons + types)`);
	
	if (missing.length > 0) {
		console.error(`\n❌ Missing ${missing.length} icons that lucide-react exports:`);
		console.error(`   ${missing.slice(0, 20).join(", ")}${missing.length > 20 ? "..." : ""}`);
		console.error(`\n   Users importing these from lucide-react won't find them in our library.`);
		process.exit(1);
	}
	
	if (extras.length > 0) {
		console.log(`   Extra exports: ${extras.length} (CustomIcon, types, etc.)`);
	}
	
	console.log(`\n✅ All ${lucideExports.size} lucide-react icons are available.`);
	console.log(`   Drop-in replacement supported! ✨`);
	
} catch (e) {
	console.error(`❌ Test failed: ${e.message}`);
	process.exit(1);
}
