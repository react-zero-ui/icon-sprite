#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as babel from "@babel/core";
import traverseImport from "@babel/traverse";
import * as t from "@babel/types";
import { loadConfig } from "../dist/loadConfig.js";

// ESM __dirname shim
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICONS = new Set();

// Props that may behave differently in prod (sprite mode) vs dev
const RISKY_PROPS = new Set([
	// Color props - should use className="text-*" instead
	"stroke", "fill", "color",
	// Stroke presentation attributes - don't cascade into <use> shadow DOM
	"strokeLinecap", "strokeLinejoin", "strokeDasharray", 
	"strokeDashoffset", "strokeMiterlimit", "strokeOpacity",
	// Fill presentation attributes
	"fillOpacity", "fillRule",
	// Other presentation attributes
	"opacity", "transform", "vectorEffect",
]);

// Track warnings: { file, line, icon, prop }
const riskyPropWarnings = [];

// Load user config (merged with defaults)
const { IMPORT_NAME, ROOT_DIR, IGNORE_ICONS, EXCLUDE_DIRS } = await loadConfig();

// 1️⃣ Find the consuming app's root
function findProjectRoot(dir = process.cwd()) {
	let current = dir;
	while (true) {
		if (fs.existsSync(path.join(current, "package.json"))) return current;
		const parent = path.dirname(current);
		if (parent === current) break;
		current = parent;
	}
	throw new Error("Could not locate project root");
}
const projectRoot = findProjectRoot();
const scanRoot = path.join(projectRoot, ROOT_DIR);

// 2️⃣ Recursively scan for imports & JSX usage
function collect(dir) {
	for (const file of fs.readdirSync(dir)) {
		const full = path.join(dir, file);
		if (fs.statSync(full).isDirectory()) {
			// Skip excluded directories
			if (EXCLUDE_DIRS.includes(file)) {
				continue;
			}
			collect(full);
			continue;
		}
		if (!/\.[jt]sx$/.test(full)) continue;

		const src = fs.readFileSync(full, "utf8");
		const ast = babel.parseSync(src, {
			filename: full,
			presets: [
				["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
				["@babel/preset-react", { runtime: "automatic" }],
			],
			sourceType: "module",
		});
		if (!ast) continue;

		// Track local icon names imported from our library
		const iconLocalNames = new Set();
		const iconImports = new Map(); // local name -> imported name

		traverseImport.default(ast, {
			ImportDeclaration(nodePath) {
				if (nodePath.node.source.value !== IMPORT_NAME) return;
				for (const spec of nodePath.node.specifiers) {
					if (t.isImportSpecifier(spec)) {
						const imported = spec.imported.name;
						const local = spec.local.name;
						if (imported === "Icon") {
							iconLocalNames.add(local);
						} else if (!IGNORE_ICONS.includes(imported)) {
							ICONS.add(imported);
							iconLocalNames.add(local);
							iconImports.set(local, imported);
						}
					}
				}
			},
			JSXElement(nodePath) {
				const opening = nodePath.get("openingElement");
				const nameNode = opening.get("name");
				if (!nameNode.isJSXIdentifier()) return;
				const tag = nameNode.node.name;
				
				// Check if this is one of our icon components
				if (!iconLocalNames.has(tag)) return;
				
				const iconName = iconImports.get(tag) || tag;
				const line = nodePath.node.loc?.start?.line || "?";
				
				// Check for risky props
				for (const attrPath of opening.get("attributes")) {
					if (!attrPath.isJSXAttribute()) continue;
					const attrNameNode = attrPath.get("name");
					if (!attrNameNode.isJSXIdentifier()) continue;
					const propName = attrNameNode.node.name;
					
					if (RISKY_PROPS.has(propName)) {
						riskyPropWarnings.push({
							file: path.relative(projectRoot, full),
							line,
							icon: iconName,
							prop: propName,
						});
					}
					
					// Handle <Icon name="..."> for generic Icon component
					if (propName === "name") {
						const valuePath = attrPath.get("value");
						if (valuePath.isStringLiteral()) {
							ICONS.add(valuePath.node.value);
						} else if (valuePath.isJSXExpressionContainer()) {
							const exprPath = valuePath.get("expression");
							if (exprPath.evaluate) {
								const res = exprPath.evaluate();
								if (res.confident && typeof res.value === "string") {
									ICONS.add(res.value);
								} else {
									throw nodePath.buildCodeFrameError(`Unable to statically evaluate <Icon name={...}> at ${full}`);
								}
							}
						}
					}
				}
			},
		});
	}
}

collect(scanRoot);

// 3️⃣ Emit the list
const outFile = path.join(__dirname, "used-icons.js");
fs.writeFileSync(outFile, `export const ICONS = ${JSON.stringify([...ICONS].sort(), null, 2)};\n`, "utf8");
console.log(`✅ Found ${ICONS.size} icons; wrote to ${outFile}`);

// 4️⃣ Warn about risky props
if (riskyPropWarnings.length > 0) {
	console.log("");
	console.warn(`⚠️  Found ${riskyPropWarnings.length} icon(s) with props that may differ in prod:`);
	
	// Group by file for cleaner output
	const byFile = new Map();
	for (const w of riskyPropWarnings) {
		if (!byFile.has(w.file)) byFile.set(w.file, []);
		byFile.get(w.file).push(w);
	}
	
	for (const [file, warnings] of byFile) {
		console.warn(`   ${file}:`);
		for (const w of warnings.slice(0, 5)) {
			console.warn(`     Line ${w.line}: <${w.icon} ${w.prop}="..." /> - "${w.prop}" may not work in prod`);
		}
		if (warnings.length > 5) {
			console.warn(`     ... and ${warnings.length - 5} more`);
		}
	}
	
	console.warn("");
	console.warn(`   💡 Tip: Use className="text-red-500" for colors (works via currentColor)`);
	console.warn(`   💡 Props like strokeLinecap, fill, stroke don't cascade into <use> shadow DOM`);
	console.warn("");
}
