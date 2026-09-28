import { collectSpriteSymbols } from "./collect-sprite-symbols.js"
import { resolveSpriteBuildConfig } from "./resolve-build-config.js"
import { scanIconUsage } from "./scan-icon-usage.js"
import { writeSpriteSheet } from "./write-sprite-sheet.js"

export interface SpriteBuildResult {
  iconCount: number
  outputFile: string
  warnings: string[]
}

/**
 * Build one application's SVG sprite sheet from its source and zero-ui.config.{ts,js}.
 * This is the consumer build operation; React rendering never calls it.
 *
 * @param projectDirectory Application root, defaulting to the current directory.
 * @returns Written file, distinct symbol count, and config/scan/missing-asset warnings.
 * @throws Parse, catalog, asset, or write errors; a previous sprite remains intact.
 *
 * The operation performs no console reporting and leaves cwd and package files
 * unchanged. Separate project calls share no operation state. Custom SVGs are
 * trusted inputs and are all included so runtime-selected names remain usable.
 */
export async function buildSpriteSheet(
  projectDirectory = process.cwd()
): Promise<SpriteBuildResult> {
  const project = await resolveSpriteBuildConfig(projectDirectory)
  const usage = scanIconUsage(project.scan)
  const assets = collectSpriteSymbols(usage, project.customDirectory)
  const iconCount = writeSpriteSheet(project.outputFile, assets.symbols)
  return {
    outputFile: project.outputFile,
    iconCount,
    warnings: [...project.warnings, ...usage.warnings, ...assets.warnings],
  }
}
