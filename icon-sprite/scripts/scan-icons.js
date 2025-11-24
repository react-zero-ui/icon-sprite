#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as babel from "@babel/core";
import traverseImport from "@babel/traverse";
import * as t from "@babel/types";
import { IMPORT_NAME, ROOT_DIR, IGNORE_ICONS, EXCLUDE_DIRS } from "../dist/config.js";

// ESM __dirname shim
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICONS = new Set();

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

		// Track local "Icon" aliases in this file
		const iconLocalNames = new Set();

		traverseImport.default(ast, {
			ImportDeclaration(path) {
				if (path.node.source.value !== IMPORT_NAME) return;
				for (const spec of path.node.specifiers) {
					if (t.isImportSpecifier(spec)) {
						const imported = spec.imported.name;
						const local = spec.local.name;
						if (imported === "Icon") {
							// generic Component: track for JSX
							iconLocalNames.add(local);
							// ignore CustomIcon imports
						} else if (!IGNORE_ICONS.includes(imported)) {
							// named icon import
							ICONS.add(imported);
						}
					}
				}
			},
			JSXElement(path) {
				const opening = path.get("openingElement");
				const nameNode = opening.get("name");
				if (!nameNode.isJSXIdentifier()) return;
				const tag = nameNode.node.name;
				if (!iconLocalNames.has(tag)) return;
				// found <Icon ...>
				for (const attrPath of opening.get("attributes")) {
					if (!attrPath.isJSXAttribute()) continue;
					const attrName = attrPath.get("name");
					if (!attrName.isJSXIdentifier({ name: "name" })) continue;
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
								throw path.buildCodeFrameError(`Unable to statically evaluate <Icon name={...}> at ${full}`);
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
