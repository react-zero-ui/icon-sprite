// src/loadConfig.ts
// Node.js-only config loader - uses fs to read user's zero-ui.config.js
// Only used by CLI scripts, NOT imported by runtime code

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import * as defaults from "./config.js";
import type { ZeroUIConfig } from "./config.js";

// Re-export for convenience
export type { ZeroUIConfig };

// Internal type with all fields required (after merging with defaults)
type ResolvedConfig = Required<ZeroUIConfig>;

// Auto-detect the source directory by checking common patterns
function detectRootDir(): string {
	const cwd = process.cwd();
	// Priority order: src (most common), app (Next.js App Router), pages (Next.js Pages Router)
	const candidates = ["src", "app", "pages"];

	for (const dir of candidates) {
		const fullPath = path.join(cwd, dir);
		if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
			return dir;
		}
	}

	// Fallback to "src" even if it doesn't exist (will error later with clear message)
	return "src";
}

const DEFAULT_CONFIG: ResolvedConfig = {
	IMPORT_NAME: defaults.IMPORT_NAME,
	SPRITE_PATH: defaults.SPRITE_PATH,
	ROOT_DIR: defaults.ROOT_DIR, // Static default, will be overridden by detection
	CUSTOM_SVG_DIR: defaults.CUSTOM_SVG_DIR,
	OUTPUT_DIR: defaults.OUTPUT_DIR,
	IGNORE_ICONS: [...defaults.IGNORE_ICONS],
	EXCLUDE_DIRS: [...defaults.EXCLUDE_DIRS],
};

// Find and load user config file (supports .ts and .js)
async function loadUserConfig(): Promise<ZeroUIConfig> {
	const cwd = process.cwd();
	// Check for config files in order of preference
	const candidates = ["zero-ui.config.ts", "zero-ui.config.js"];

	for (const filename of candidates) {
		const configPath = path.resolve(cwd, filename);
		if (fs.existsSync(configPath)) {
			try {
				const mod = await import(pathToFileURL(configPath).href);
				return mod.default ?? mod;
			} catch (e) {
				// For .ts files, provide helpful error message
				if (filename.endsWith(".ts")) {
					console.warn(
						`⚠️ Failed to load ${filename}. TypeScript config files require Node.js 22.6+ with --experimental-strip-types, or use tsx/ts-node.`,
            "\n Or use a zero-ui.config.js config file instead.",
						`\n   Falling back to auto-detection. Error: ${(e as Error).message}`
					);
				} else {
					console.warn(`⚠️ Failed to load ${filename}:`, (e as Error).message);
				}
			}
		}
	}

	return {};
}

export async function loadConfig(): Promise<ResolvedConfig> {
	const userConfig = await loadUserConfig();

	// Auto-detect ROOT_DIR if not explicitly set by user
	const detectedRootDir = detectRootDir();
	const finalConfig: ResolvedConfig = {
		...DEFAULT_CONFIG,
		ROOT_DIR: detectedRootDir, // Use detected value as base
		...userConfig, // User config overrides everything
	};

	return finalConfig;
}

// For convenience, export a pre-loaded config promise
export const config = loadConfig();
