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
const componentDir = path.resolve("src/lucide-archive");

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

function kebabToPascal(str) {
	return str
		.split("-")
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join("");
}

function toJsxAttrs(markup) {
	return markup
		.replace(/\bclass=/g, "className=")
		.replace(/\bstroke-width=/g, "strokeWidth=")
		.replace(/\bstroke-linecap=/g, "strokeLinecap=")
		.replace(/\bstroke-linejoin=/g, "strokeLinejoin=")
		.replace(/\bstroke-dasharray=/g, "strokeDasharray=")
		.replace(/\bstroke-dashoffset=/g, "strokeDashoffset=")
		.replace(/\bstroke-miterlimit=/g, "strokeMiterlimit=")
		.replace(/\bstroke-opacity=/g, "strokeOpacity=")
		.replace(/\bfill-opacity=/g, "fillOpacity=")
		.replace(/\bfill-rule=/g, "fillRule=")
		.replace(/\bclip-rule=/g, "clipRule=")
		.replace(/\bclip-path=/g, "clipPath=");
}

function extractSvg(svg) {
	const match = svg.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/);
	if (!match) throw new Error("Expected an <svg> root element");
	return {
		attrs: toJsxAttrs(match[1]).trim(),
		children: toJsxAttrs(match[2]).trim(),
	};
}

function writeArchivedComponent(svgId, svg) {
	const componentName = kebabToPascal(svgId);
	const { attrs, children } = extractSvg(svg);
	const attrText = attrs
		.replace(/\swidth="[^"]*"/, "")
		.replace(/\sheight="[^"]*"/, "");

	return `\
import { type IconProps } from "../_shared.js";

export function ${componentName}({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      ${attrText}
      {...rest}
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
    >
      ${children}
    </svg>
  );
}
`;
}

fs.rmSync(componentDir, { recursive: true, force: true });
fs.mkdirSync(componentDir, { recursive: true });

let generated = 0;
for (const file of fs.readdirSync(outDir)) {
	if (!file.endsWith(".svg")) continue;
	const svgId = file.slice(0, -4);
	const svg = fs.readFileSync(path.join(outDir, file), "utf8");
	fs.writeFileSync(path.join(componentDir, `${kebabToPascal(svgId)}.tsx`), writeArchivedComponent(svgId, svg), "utf8");
	generated++;
}

console.log(`✅ Generated ${generated} archived Lucide React components in ${componentDir}`);
