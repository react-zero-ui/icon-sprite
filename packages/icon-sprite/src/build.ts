import { collectSymbols } from "./build/icon-assets.js"
import { resolveProject } from "./build/project.js"
import { scanIcons } from "./build/source-scanner.js"
import { writeSprite } from "./build/sprite-writer.js"

export interface SpriteBuildResult {
  iconCount: number
  outputFile: string
  warnings: string[]
}

/**
 * Generate one application's sprite from its source and zero-ui.config.{ts,js}.
 *
 * @param projectDirectory Application root, defaulting to the current directory.
 * @returns Written file, distinct symbol count, and config/scan/missing-asset warnings.
 * @throws Parse, manifest, asset, or write errors; a previous sprite remains intact.
 *
 * The operation performs no console reporting and leaves cwd and package files
 * unchanged. Separate project calls share no operation state. Custom SVGs are
 * trusted inputs and are all included so runtime-selected names remain usable.
 */
export async function generateSprite(projectDirectory = process.cwd()): Promise<SpriteBuildResult> {
  const project = await resolveProject(projectDirectory)
  const usage = scanIcons(project.scan)
  const assets = collectSymbols(usage, project.customDirectory)
  const iconCount = writeSprite(project.outputFile, assets.symbols)
  return {
    outputFile: project.outputFile,
    iconCount,
    warnings: [...project.warnings, ...usage.warnings, ...assets.warnings],
  }
}
