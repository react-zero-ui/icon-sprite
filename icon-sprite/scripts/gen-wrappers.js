#!/usr/bin/env node
/**
 * Generate icon wrapper components for multiple icon packs.
 *
 * Supported packs:
 * - Lucide (lucide-react / lucide-static)
 * - Tabler (@tabler/icons-react / @tabler/icons)
 *
 * Strategy:
 * 1. For each pack, get SVGs and React export names
 * 2. Use React library's exact names (for drop-in compatibility)
 * 3. Prefix SVG IDs in sprite to avoid conflicts (e.g., "tabler-arrow-up")
 */
import fs from "fs";
import path from "path";

const __dirname = path.resolve(process.cwd());

// Where to write wrappers
const OUT_DIR = path.resolve("src/icons");
const MERGED_LUCIDE_DIR = path.resolve("scripts/lucide-icons");

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

function kebabToPascal(str) {
	return str
		.split("-")
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join("");
}

function pascalToKebab(str) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.replace(/([a-zA-Z])(\d)/g, "$1-$2")
		.replace(/(\d)([a-zA-Z])/g, "$1-$2")
		.toLowerCase();
}

function recordSkippedIcon({ pack, svgId, componentName, reason, collidesWith }) {
	skippedIcons.push({
		pack,
		svgId,
		componentName,
		reason,
		collidesWith,
	});
}

function writeWrapper(componentName, spriteId, pack) {
	return `\
import { SPRITE_PATH } from "../config.js";
import { ${componentName} as DevIcon } from "${pack}";
import { renderUse, type IconProps } from "../_shared.js";

export function ${componentName}(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return (
      <DevIcon
        {...(rest as any)}
        size={size ?? 24}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return renderUse("${spriteId}", SPRITE_PATH, props);
}
`;
}

function writeSpriteOnlyWrapper(componentName, spriteId) {
	return `\
import { SPRITE_PATH } from "../config.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ${componentName}(props: IconProps) {
  return renderUse("${spriteId}", SPRITE_PATH, props);
}
`;
}

// ============================================================================
// LUCIDE ICONS
// ============================================================================

function getLucideStaticSvgIds() {
	const svgDir = fs.existsSync(MERGED_LUCIDE_DIR)
		? MERGED_LUCIDE_DIR
		: path.resolve(__dirname, "node_modules/lucide-static/icons");
	if (!fs.existsSync(svgDir)) return new Set();

	const files = fs.readdirSync(svgDir).filter((f) => f.endsWith(".svg"));
	return new Set(files.map((f) => f.replace(".svg", "")));
}

function getLucideReactExports() {
	const lucideDts = path.resolve(__dirname, "node_modules/lucide-react/dist/lucide-react.d.ts");

	if (!fs.existsSync(lucideDts)) return new Map();

	const content = fs.readFileSync(lucideDts, "utf8");

	const exports = new Map();
	const matches = content.matchAll(/declare const (\w+): react\.ForwardRefExoticComponent/g);

	for (const match of matches) {
		const name = match[1];

		if (!name.startsWith("Lucide") && !name.endsWith("Icon")) {
			const key = pascalToKebab(name).replace(/-/g, "");
			exports.set(key, name);
		}
	}

	return exports;
}

function getLucideComponentName(svgId, reactExports) {
	const normalizedKey = svgId.replace(/-/g, "");

	if (reactExports.has(normalizedKey)) {
		return reactExports.get(normalizedKey);
	}

	return kebabToPascal(svgId);
}

// ============================================================================
// TABLER ICONS
// ============================================================================

function getTablerStaticSvgIds() {
	// Use outline style by default (like Lucide)
	const svgDir = path.resolve(__dirname, "node_modules/@tabler/icons/icons/outline");

	if (!fs.existsSync(svgDir)) return new Set();

	const files = fs.readdirSync(svgDir).filter((f) => f.endsWith(".svg"));
	return new Set(files.map((f) => f.replace(".svg", "")));
}

function getTablerReactExports() {
	const tablerDts = path.resolve(__dirname, "node_modules/@tabler/icons-react/dist/tabler-icons-react.d.ts");

	if (!fs.existsSync(tablerDts)) return new Map();

	const content = fs.readFileSync(tablerDts, "utf8");

	const exports = new Map();

	// Match: declare const IconName: react.ForwardRefExoticComponent
	const matches = content.matchAll(/declare const (Icon\w+): react\.ForwardRefExoticComponent/g);

	for (const match of matches) {
		const name = match[1]; // e.g., "IconAccessPoint"

		// Create key from name without "Icon" prefix
		const withoutPrefix = name.replace(/^Icon/, "");
		const key = pascalToKebab(withoutPrefix).replace(/-/g, "");

		exports.set(key, name);
	}

	return exports;
}

function getTablerComponentName(svgId, reactExports) {
	const normalizedKey = svgId.replace(/-/g, "");

	if (reactExports.has(normalizedKey)) {
		return reactExports.get(normalizedKey);
	}

	// Derive with Icon prefix
	return "Icon" + kebabToPascal(svgId);
}

// ============================================================================
// Generate wrappers
// ============================================================================

// Track generated names for case collision detection
const generatedNames = new Map();

let totalGenerated = 0;
let totalSkipped = 0;

const skippedIcons = [];

// Mapping of component name → sprite info (for build-sprite.js to use)
const componentToSprite = new Map();

// --- LUCIDE ---
const lucideSvgIds = getLucideStaticSvgIds();
const lucideReactExports = getLucideReactExports();
let lucideCount = 0;
let lucideSpriteOnlyCount = 0;

for (const svgId of lucideSvgIds) {
	const normalizedKey = svgId.replace(/-/g, "");
	const hasDevExport = lucideReactExports.has(normalizedKey);
	const componentName = hasDevExport ? lucideReactExports.get(normalizedKey) : kebabToPascal(svgId);
	const lowerName = componentName.toLowerCase();

	if (generatedNames.has(lowerName)) {
		const existing = generatedNames.get(lowerName);

		totalSkipped++;
		recordSkippedIcon({
			pack: "lucide",
			svgId,
			componentName,
			reason: "case-collision",
			collidesWith: existing,
		});

		continue;
	}

	generatedNames.set(lowerName, { name: componentName, pack: "lucide" });

	// Lucide SVG IDs don't need prefix (they're the "default")
	const spriteId = svgId;

	// Store mapping for build-sprite.js
	componentToSprite.set(componentName, {
		pack: "lucide",
		spriteId,
		svgFile: `${svgId}.svg`,
	});

	const wrapperTsx = hasDevExport
		? writeWrapper(componentName, spriteId, "lucide-react")
		: writeSpriteOnlyWrapper(componentName, spriteId);

	fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), wrapperTsx);
	lucideCount++;
	if (!hasDevExport) lucideSpriteOnlyCount++;
	totalGenerated++;
}

// --- TABLER ---
const tablerSvgIds = getTablerStaticSvgIds();
const tablerReactExports = getTablerReactExports();
let tablerCount = 0;

for (const svgId of tablerSvgIds) {
	const componentName = getTablerComponentName(svgId, tablerReactExports);
	const lowerName = componentName.toLowerCase();

	if (generatedNames.has(lowerName)) {
		const existing = generatedNames.get(lowerName);

		totalSkipped++;
		recordSkippedIcon({
			pack: "tabler",
			svgId,
			componentName,
			reason: "case-collision",
			collidesWith: existing,
		});

		continue;
	}

	generatedNames.set(lowerName, { name: componentName, pack: "tabler" });

	// Prefix Tabler SVG IDs to avoid conflicts in sprite
	const spriteId = `tabler-${svgId}`;

	// Store mapping for build-sprite.js
	componentToSprite.set(componentName, {
		pack: "tabler",
		spriteId,
		svgFile: `${svgId}.svg`,
	});

	const wrapperTsx = writeWrapper(componentName, spriteId, "@tabler/icons-react");

	fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), wrapperTsx);
	tablerCount++;
	totalGenerated++;
}

// --- Write component-to-sprite mapping ---
const mappingFile = path.join(__dirname, "scripts", "component-sprite-map.json");
const mappingObj = Object.fromEntries(componentToSprite);

fs.writeFileSync(mappingFile, JSON.stringify(mappingObj, null, 2), "utf8");

// --- Write skipped icon report ---
const skippedFile = path.join(__dirname, "scripts", "skipped-icons.json");

fs.writeFileSync(skippedFile, JSON.stringify(skippedIcons, null, 2), "utf8");

// --- Summary ---
console.log(`✅ Generated ${totalGenerated} icon wrappers in ${OUT_DIR}`);
console.log(`   📦 Lucide: ${lucideCount} icons (${lucideReactExports.size} react-compatible)`);
if (lucideSpriteOnlyCount > 0) console.log(`      ↳ ${lucideSpriteOnlyCount} archived Lucide icons use sprite-only wrappers`);
console.log(`   📦 Tabler: ${tablerCount} icons (${tablerReactExports.size} react-compatible)`);
console.log(`   📁 Wrote mapping to ${mappingFile}`);

if (totalSkipped > 0) {
	console.log(`   ⚠️  Skipped ${totalSkipped} case-collision aliases:`);
	console.log(`   📁 Wrote skipped list to ${skippedFile}`);

	for (const skipped of skippedIcons) {
		console.log(`      - ${skipped.pack}:${skipped.svgId} → ${skipped.componentName} ` + `collides with ${skipped.collidesWith.pack}:${skipped.collidesWith.name}`);
	}
} else {
	console.log("   ✅ Skipped 0 icons");
}
