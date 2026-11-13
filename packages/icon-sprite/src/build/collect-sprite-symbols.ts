import fs from "node:fs"
import path from "node:path"
import { customIconId } from "../sprite-contract.js"
import { openPackagedIcons } from "./packaged-icons.js"
import type { IconUsage } from "./scan-icon-usage.js"
import type { SpriteSymbol } from "./write-sprite-sheet.js"

/**
 * Resolve discovered built-ins and referenced public SVG paths.
 * Source paths determine stable custom IDs; missing or unreadable assets fail
 * before the writer changes the previous sprite.
 */
export function collectSpriteSymbols(
  usage: IconUsage,
  publicDirectory: string,
  outputFile: string
): {
  symbols: SpriteSymbol[]
  warnings: string[]
} {
  const resolveIcon = openPackagedIcons()
  const requested = usage.icons.map((name) => ({ name, ...resolveIcon(name) }))
  const symbols: SpriteSymbol[] = []
  const added = new Set<string>()
  for (const icon of requested) {
    if (icon.svg && !added.has(icon.id)) {
      symbols.push({
        id: icon.id,
        markup: icon.svg,
        presentation: "inherit",
        source: icon.description,
      })
      added.add(icon.id)
    }
  }
  for (const src of usage.customSources) {
    const file = path.resolve(publicDirectory, src.slice(1))
    if (file === path.resolve(outputFile)) {
      throw new Error(`CustomIcon source "${src}" resolves to the sprite output file: ${file}`)
    }
    if (!fs.existsSync(file) || !fs.lstatSync(file).isFile()) {
      throw new Error(`CustomIcon source "${src}" must be an existing regular SVG file: ${file}`)
    }
    symbols.push({
      id: customIconId(src),
      markup: fs.readFileSync(file, "utf8"),
      presentation: "authored",
      source: file,
    })
  }
  const warnings: string[] = []
  for (const icon of requested) {
    if (!added.has(icon.id)) {
      warnings.push(`Missing icon: ${icon.name} (${icon.description}).`)
    }
  }
  return { symbols, warnings }
}
