import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { DEFAULT_CONFIG, parseConfig, type ZeroUIConfig } from "../config.js"
import type { IconScanOptions } from "./scan-icon-usage.js"

/** Fully resolved consumer inputs. Downstream modules never interpret config paths. */
export interface SpriteBuildConfig {
  customDirectory: string
  outputFile: string
  scan: IconScanOptions
  warnings: string[]
}

function detectSourceDirectory(root: string): string {
  for (const directory of ["src", "app", "pages"]) {
    const file = path.join(root, directory)
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      return directory
    }
  }
  return DEFAULT_CONFIG.ROOT_DIR
}

/** Load trusted project code with Node's normal module cache and relative-import semantics. */
async function loadProjectConfig(root: string, warnings: string[]): Promise<ZeroUIConfig> {
  for (const filename of ["zero-ui.config.ts", "zero-ui.config.js"]) {
    const file = path.join(root, filename)
    if (!fs.existsSync(file)) {
      continue
    }
    try {
      // biome-ignore lint/performance/noAwaitInLoops: Config precedence requires executing the next module only if this candidate fails.
      const module = await import(pathToFileURL(file).href)
      return parseConfig(module.default ?? module)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const hint = filename.endsWith(".ts")
        ? " TypeScript configs need a Node.js runtime with type stripping enabled or a TypeScript loader; zero-ui.config.js is also supported."
        : ""
      warnings.push(
        `Failed to load ${file}: ${message}.${hint} Trying the next config or defaults.`
      )
    }
  }
  return {}
}

/**
 * Resolve configuration and filesystem paths for one build without changing cwd.
 * Invalid config warns and falls back; arrays replace defaults and are copied.
 * Paths are trusted build inputs; callers control filesystem access. Config module edits in a running
 * process follow Node's import cache; application source is rescanned each build.
 */
export async function resolveSpriteBuildConfig(
  projectDirectory: string
): Promise<SpriteBuildConfig> {
  const root = path.resolve(projectDirectory)
  const warnings: string[] = []
  const overrides = await loadProjectConfig(root, warnings)
  const config = { ...DEFAULT_CONFIG, ...overrides }
  return {
    customDirectory: path.resolve(root, config.OUTPUT_DIR, config.CUSTOM_SVG_DIR),
    // join preserves the historical public-URL convention: /icons.svg stays under OUTPUT_DIR.
    outputFile: path.join(root, config.OUTPUT_DIR, config.SPRITE_PATH),
    scan: {
      sourceDirectory: path.resolve(root, overrides.ROOT_DIR ?? detectSourceDirectory(root)),
      projectDirectory: root,
      importName: config.IMPORT_NAME,
      excludeDirectories: [...config.EXCLUDE_DIRS],
      ignoreIcons: [...config.IGNORE_ICONS],
    },
    warnings,
  }
}
