#!/usr/bin/env node
import fs from "fs";
import path from "path";

const __dirname = path.resolve(process.cwd());

// 1️⃣ Where Lucide's raw SVGs live
const ICON_SVG_DIR = path.resolve(__dirname, "node_modules/lucide-static/icons");

// 2️⃣ Where to write your wrappers
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

// 3️⃣ Read every SVG filename
const files = fs.readdirSync(ICON_SVG_DIR).filter((f) => f.endsWith(".svg"));

// 4️⃣ Helper: kebab ⇄ Pascal
const toPascal = (s) =>
	s
		.split("-")
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join("");

// 5️⃣ Track generated names to detect case collisions (macOS is case-insensitive)
const generatedNames = new Map(); // lowercase -> original pascal name

// 6️⃣ Generate one .tsx per icon
let skippedCount = 0;
for (const file of files) {
	const id = file.replace(".svg", ""); // e.g. "arrow-right"
	const pascal = toPascal(id); // "ArrowRight"
	const lowerPascal = pascal.toLowerCase();

	// Skip case collisions (e.g., ArrowDownAZ vs ArrowDownAz on case-insensitive filesystems)
	if (generatedNames.has(lowerPascal)) {
		skippedCount++;
		continue;
	}
	generatedNames.set(lowerPascal, pascal);

	const wrapperTsx = `\
import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { ${pascal} as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function ${pascal}({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("${pascal}", size, width, height);
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
  return  renderUse("${id}", width, height, size, SPRITE_PATH, props)
}
`;

	fs.writeFileSync(path.join(OUT_DIR, `${pascal}.tsx`), wrapperTsx);
}

console.log(`✅ Generated ${generatedNames.size} icon wrappers in ${OUT_DIR}${skippedCount > 0 ? ` (skipped ${skippedCount} case-collision aliases)` : ""}`);
