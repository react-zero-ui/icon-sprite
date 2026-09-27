// Node-only configuration loading. Runtime components use config.ts directly.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { ZeroUIConfig } from "./config.js";
import * as defaults from "./config.js";

export type { ZeroUIConfig };

type ResolvedConfig = Required<ZeroUIConfig>;

function detectRootDir(projectDir: string): string {
  for (const dir of ["src", "app", "pages"]) {
    const fullPath = path.join(projectDir, dir);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      return dir;
    }
  }
  return defaults.ROOT_DIR;
}

function validateConfig(value: unknown): ZeroUIConfig {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Expected a configuration object.");
  }
  const entries: Record<string, unknown> = { ...value };
  const config: ZeroUIConfig = {};
  for (const key of ["IMPORT_NAME", "SPRITE_PATH", "ROOT_DIR", "CUSTOM_SVG_DIR", "OUTPUT_DIR"] as const) {
    const entry = entries[key];
    if (entry === undefined) continue;
    if (typeof entry !== "string") throw new Error(`${key} must be a string.`);
    config[key] = entry;
  }
  for (const key of ["IGNORE_ICONS", "EXCLUDE_DIRS"] as const) {
    const entry = entries[key];
    if (entry === undefined) continue;
    if (!Array.isArray(entry) || !entry.every((item: unknown) => typeof item === "string")) {
      throw new Error(`${key} must be an array of strings.`);
    }
    config[key] = [...entry];
  }
  return config;
}

async function loadUserConfig(projectDir: string): Promise<ZeroUIConfig> {
  for (const filename of ["zero-ui.config.ts", "zero-ui.config.js"]) {
    const configPath = path.join(projectDir, filename);
    if (fs.existsSync(configPath)) {
      try {
        const mod = await import(pathToFileURL(configPath).href);
        return validateConfig(mod.default ?? mod);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const hint = filename.endsWith(".ts")
          ? " TypeScript configs need a Node.js runtime with type stripping enabled or a TypeScript loader; zero-ui.config.js is also supported."
          : "";
        console.warn(`Failed to load ${configPath}: ${message}.${hint} Trying the next config or defaults.`);
      }
    }
  }
  return {};
}

/**
 * Resolve one consumer's configuration without changing cwd or runtime defaults.
 * TypeScript takes precedence over JavaScript; invalid files warn and fall back.
 * Config modules follow Node's import caching; returned arrays are fresh per call.
 */
export async function loadConfig(projectDir = process.cwd()): Promise<ResolvedConfig> {
  const root = path.resolve(projectDir);
  const userConfig = await loadUserConfig(root);
  return {
    IMPORT_NAME: defaults.IMPORT_NAME,
    SPRITE_PATH: defaults.SPRITE_PATH,
    ROOT_DIR: userConfig.ROOT_DIR ?? detectRootDir(root),
    CUSTOM_SVG_DIR: defaults.CUSTOM_SVG_DIR,
    OUTPUT_DIR: defaults.OUTPUT_DIR,
    IGNORE_ICONS: [...defaults.IGNORE_ICONS],
    EXCLUDE_DIRS: [...defaults.EXCLUDE_DIRS],
    ...userConfig,
  };
}
