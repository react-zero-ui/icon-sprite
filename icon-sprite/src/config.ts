// src/config.ts
// Client-safe config - NO fs, NO Node.js modules
// These are the default values. User overrides are applied at build time via CLI.

/** Configuration options for zero-ui.config.js or zero-ui.config.ts */
export interface ZeroUIConfig {
	/** Package import name (default: "@react-zero-ui/icon-sprite") */
	IMPORT_NAME?: string;
	/** Path to the sprite file relative to public dir (default: "/icons.svg") */
	SPRITE_PATH?: string;
	/** Root directory to scan for icon imports (default: auto-detected from "src", "app", or "pages") */
	ROOT_DIR?: string;
	/** Directory for custom SVG icons inside OUTPUT_DIR (default: "zero-ui-icons") */
	CUSTOM_SVG_DIR?: string;
	/** Output directory for built assets (default: "public") */
	OUTPUT_DIR?: string;
	/** Icon names to ignore during scanning (default: ["CustomIcon"]) */
	IGNORE_ICONS?: string[];
	/** Directories to exclude from scanning (default: ["node_modules", ".git", "dist", "build", ".next", "out"]) */
	EXCLUDE_DIRS?: string[];
}

export const IMPORT_NAME = "@react-zero-ui/icon-sprite";
export const SPRITE_PATH = "/icons.svg";
export const ROOT_DIR = "src";
export const CUSTOM_SVG_DIR = "zero-ui-icons";
export const OUTPUT_DIR = "public";
export const IGNORE_ICONS = ["CustomIcon"];
export const EXCLUDE_DIRS = ["node_modules", ".git", "dist", "build", ".next", "out"];
