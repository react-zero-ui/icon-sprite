#!/usr/bin/env node
/**
 * Generate icon wrapper components.
 * 
 * Strategy:
 * 1. Get all SVGs from lucide-static
 * 2. Get export names from lucide-react
 * 3. For icons in lucide-react: use their exact name (for drop-in compatibility)
 * 4. For icons only in lucide-static: derive name from filename
 * 
 * This ensures:
 * - All lucide-react imports work as drop-in replacement
 * - Extra icons from lucide-static are also available
 * - Future icon packs can be added
 */
import fs from "fs";
import path from "path";

const __dirname = path.resolve(process.cwd());

// Where to write wrappers
const OUT_DIR = path.resolve("src/icons");

// Preserve manually maintained files
const PRESERVE_FILES = ["CustomIcon.tsx"];

// Clean old generated files before regenerating
if (fs.existsSync(OUT_DIR)) {
	const existing = fs.readdirSync(OUT_DIR);
	for (const file of existing) {
		if (!PRESERVE_FILES.includes(file)) {
			fs.rmSync(path.join(OUT_DIR, file));
		}
	}
} else {
	fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ============================================================================
// Helper functions
// ============================================================================

// Convert kebab-case to PascalCase
function kebabToPascal(str) {
	return str
		.split("-")
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join("");
}

// Convert PascalCase to kebab-case
function pascalToKebab(str) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.replace(/([a-zA-Z])(\d)/g, "$1-$2")
		.replace(/(\d)([a-zA-Z])/g, "$1-$2")
		.toLowerCase();
}

// ============================================================================
// Get data from lucide packages
// ============================================================================

// Get all SVG IDs from lucide-static
function getStaticSvgIds() {
	const svgDir = path.resolve(__dirname, "node_modules/lucide-static/icons");
	const files = fs.readdirSync(svgDir).filter((f) => f.endsWith(".svg"));
	return new Set(files.map((f) => f.replace(".svg", "")));
}

// Get export names from lucide-react (for compatibility mapping)
function getLucideReactExports() {
	const lucideDts = path.resolve(__dirname, "node_modules/lucide-react/dist/lucide-react.d.ts");
	if (!fs.existsSync(lucideDts)) {
		console.warn("⚠️ lucide-react types not found. Using derived names only.");
		return new Map();
	}
	const content = fs.readFileSync(lucideDts, "utf8");
	
	const exports = new Map(); // kebab-ish key -> exact export name
	
	const matches = content.matchAll(/declare const (\w+): react\.ForwardRefExoticComponent/g);
	for (const match of matches) {
		const name = match[1];
		if (!name.startsWith("Lucide") && !name.endsWith("Icon")) {
			// Create a normalized key for matching
			const key = pascalToKebab(name).replace(/-/g, "");
			exports.set(key, name);
		}
	}
	
	return exports;
}

// Find lucide-react's name for an SVG ID, or derive one
function getComponentName(svgId, lucideReactExports) {
	// Normalize the SVG ID for lookup
	const normalizedKey = svgId.replace(/-/g, "");
	
	// Check if lucide-react has this icon
	if (lucideReactExports.has(normalizedKey)) {
		return lucideReactExports.get(normalizedKey);
	}
	
	// Derive name from SVG filename
	return kebabToPascal(svgId);
}

// ============================================================================
// Generate wrappers
// ============================================================================

const staticSvgIds = getStaticSvgIds();
const lucideReactExports = getLucideReactExports();

// Track generated names for case collision detection (macOS is case-insensitive)
const generatedNames = new Map(); // lowercase -> { name, svgId }

let generatedCount = 0;
let skippedCollisions = 0;

for (const svgId of staticSvgIds) {
	const componentName = getComponentName(svgId, lucideReactExports);
	const lowerName = componentName.toLowerCase();
	
	// Skip case collisions on case-insensitive filesystems
	if (generatedNames.has(lowerName)) {
		skippedCollisions++;
		continue;
	}
	
	generatedNames.set(lowerName, { name: componentName, svgId });
	
	const wrapperTsx = `\
import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { ${componentName} as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function ${componentName}({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("${componentName}", size, width, height);
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    return (
      <DevIcon
        {...(props as any)}
        {...(size != null ? { size } : {})}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return  renderUse("${svgId}", width, height, size, SPRITE_PATH, props)
}
`;

	fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), wrapperTsx);
	generatedCount++;
}

console.log(`✅ Generated ${generatedCount} icon wrappers in ${OUT_DIR}`);
if (skippedCollisions > 0) {
	console.log(`   (skipped ${skippedCollisions} case-collision aliases)`);
}
console.log(`   lucide-react compatible: ${lucideReactExports.size} icons`);
console.log(`   Extra from lucide-static: ${generatedCount - lucideReactExports.size} icons`);
