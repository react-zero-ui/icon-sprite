import { CUSTOM_SVG_DIR, SPRITE_PATH } from "./sprite-contract.js"

// These exports retain the historical config-module import contract.
export { CUSTOM_SVG_DIR, SPRITE_PATH }

/** Configuration options for zero-ui.config.js or zero-ui.config.ts */
export interface ZeroUIConfig {
  /** Directory for custom SVG icons inside OUTPUT_DIR (default: "zero-ui-icons") */
  CUSTOM_SVG_DIR?: string
  /** Directories to exclude from scanning (default: ["node_modules", ".git", "dist", "build", ".next", "out"]) */
  EXCLUDE_DIRS?: string[]
  /** Icon names to ignore during scanning (default: ["CustomIcon"]) */
  IGNORE_ICONS?: string[]
  /** Package import name (default: "@react-zero-ui/icon-sprite") */
  IMPORT_NAME?: string
  /** Output directory for built assets (default: "public") */
  OUTPUT_DIR?: string
  /** Root directory to scan for icon imports (default: auto-detected from "src", "app", or "pages") */
  ROOT_DIR?: string
  /** Path to the sprite file relative to public dir (default: "/icons.svg") */
  SPRITE_PATH?: string
}

export const IMPORT_NAME = "@react-zero-ui/icon-sprite"
export const ROOT_DIR = "src"
export const OUTPUT_DIR = "public"
export const IGNORE_ICONS = ["CustomIcon"]
export const EXCLUDE_DIRS = ["node_modules", ".git", "dist", "build", ".next", "out"]

/** Defaults are copied per build; arrays returned to a consumer never alias these values. */
export const DEFAULT_CONFIG: Readonly<Required<ZeroUIConfig>> = {
  IMPORT_NAME,
  SPRITE_PATH,
  ROOT_DIR,
  CUSTOM_SVG_DIR,
  OUTPUT_DIR,
  IGNORE_ICONS,
  EXCLUDE_DIRS,
}

/**
 * Validate the public configuration representation without I/O or default merging.
 * Unknown keys are ignored for compatibility; arrays are copied. Project resolution
 * owns filesystem interpretation and decides which config file wins.
 */
export function parseConfig(value: unknown): ZeroUIConfig {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("Expected a configuration object.")
  }
  const entries: Record<string, unknown> = { ...value }
  const config: ZeroUIConfig = {}
  for (const key of [
    "IMPORT_NAME",
    "SPRITE_PATH",
    "ROOT_DIR",
    "CUSTOM_SVG_DIR",
    "OUTPUT_DIR",
  ] as const) {
    const entry = entries[key]
    if (entry === undefined) {
      continue
    }
    if (typeof entry !== "string") {
      throw new Error(`${key} must be a string.`)
    }
    config[key] = entry
  }
  for (const key of ["IGNORE_ICONS", "EXCLUDE_DIRS"] as const) {
    const entry = entries[key]
    if (entry === undefined) {
      continue
    }
    if (!Array.isArray(entry) || !entry.every((item: unknown) => typeof item === "string")) {
      throw new Error(`${key} must be an array of strings.`)
    }
    config[key] = [...entry]
  }
  return config
}
