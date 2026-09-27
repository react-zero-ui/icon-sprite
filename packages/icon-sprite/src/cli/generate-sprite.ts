import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
// biome-ignore lint/correctness/noUnresolvedImports: Node resolves svgstore's CommonJS main; isolated package tests verify this import.
import svgstore from "svgstore";
import { loadConfig } from "../config-loader.js";
import type { IconInfo } from "../icon-info.js";
import { scanIcons } from "./scan-icons.js";

const require = createRequire(import.meta.url);

function customSpriteId(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .replace(/(\d)([a-zA-Z])/g, "$1-$2")
    .toLowerCase();
}

function addSvg(store: ReturnType<typeof svgstore>, id: string, svg: string, source: string): void {
  if (!/<svg\b/i.test(svg)) throw new Error(`Invalid SVG in ${source}: <svg> not found.`);
  store.add(
    id,
    svg.replace(
      /stroke-width=(["'])(.*?)\1/g,
      (_match: string, _quote: string, width: string) => `stroke-width="var(--icon-stroke-width, ${width})"`,
    ),
  );
}

/**
 * Build one consumer's sprite. Reads config once and writes only the output file
 * (and its temporary sibling). Calls for distinct projects share no mutable state
 * and never change cwd. Missing icons are returned as warnings, as in the CLI;
 * parsing, asset, and write failures reject without replacing an existing sprite.
 * Returns { outputFile, iconCount, warnings }; no scan/build import side effects.
 */
export async function generateSprite(projectDir = process.cwd()) {
  const root = path.resolve(projectDir);
  const config = await loadConfig(root);
  const { icons, customIcons, warnings } = scanIcons(root, config);
  const mapping: Record<string, IconInfo> = JSON.parse(
    fs.readFileSync(new URL("../../generated/component-sprite-map.json", import.meta.url), "utf8"),
  );
  const lucide: Record<string, string> = JSON.parse(
    fs.readFileSync(new URL("../../generated/lucide-icons.json", import.meta.url), "utf8"),
  );
  const store = svgstore({
    copyAttrs: ["viewBox", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "style", "size"],
    svgAttrs: { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false" },
  });
  const added = new Set<string>();
  const needed = icons.map((name) => {
    if (Object.hasOwn(mapping, name)) return { name, ...mapping[name] };
    const spriteId = customSpriteId(name);
    return { name, pack: "custom", spriteId, svgFile: `${spriteId}.svg` };
  });

  for (const icon of needed) {
    if (icon.pack === "custom" || added.has(icon.spriteId)) continue;
    let svg: string | undefined;
    if (icon.pack === "lucide") {
      svg = lucide[icon.svgFile];
    } else if (icon.pack === "tabler") {
      try {
        svg = fs.readFileSync(require.resolve(`@tabler/icons/outline/${icon.svgFile}`), "utf8");
      } catch (error) {
        if (
          !(error instanceof Error && "code" in error && (error.code === "MODULE_NOT_FOUND" || error.code === "ENOENT"))
        )
          throw error;
      }
    }
    if (svg) {
      addSvg(store, icon.spriteId, svg, `${icon.pack}/${icon.svgFile}`);
      added.add(icon.spriteId);
    }
  }

  // All custom SVGs are intentional inputs, including unreferenced/dynamic names.
  const customDir = path.resolve(root, config.OUTPUT_DIR, config.CUSTOM_SVG_DIR);
  const availableCustom = new Set<string>();
  if (fs.existsSync(customDir)) {
    for (const entry of fs
      .readdirSync(customDir, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name))) {
      if (!entry.name.endsWith(".svg")) continue;
      const file = path.join(customDir, entry.name);
      if (!(entry.isSymbolicLink() ? fs.statSync(file) : entry).isFile()) continue;
      const id = entry.name.slice(0, -4);
      addSvg(store, id, fs.readFileSync(file, "utf8"), file);
      availableCustom.add(id);
      added.add(id);
    }
  }
  for (const icon of needed) {
    if (!added.has(icon.spriteId)) warnings.push(`Missing icon: ${icon.name} (${icon.pack}: ${icon.svgFile}).`);
  }
  for (const name of customIcons) {
    if (!availableCustom.has(name)) warnings.push(`Missing custom icon: ${name}. Add ${name}.svg to ${customDir}.`);
  }

  // SPRITE_PATH is a public URL path: a leading slash stays inside OUTPUT_DIR.
  const outputFile = path.join(root, config.OUTPUT_DIR, config.SPRITE_PATH);
  const sprite = store.toString({ inline: true });
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  const temporaryFile = `${outputFile}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporaryFile, sprite, { encoding: "utf8", flag: "wx" });
    fs.renameSync(temporaryFile, outputFile);
  } finally {
    fs.rmSync(temporaryFile, { force: true });
  }
  return { outputFile, iconCount: added.size, warnings };
}
