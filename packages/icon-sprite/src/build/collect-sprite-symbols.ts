import fs from "node:fs"
import path from "node:path"
import { openPackagedIcons } from "./packaged-icons.js"
import type { IconUsage } from "./scan-icon-usage.js"
import type { SpriteSymbol } from "./write-sprite-sheet.js"

function readCustomSymbols(directory: string): SpriteSymbol[] {
  if (!fs.existsSync(directory)) {
    return []
  }
  const symbols: SpriteSymbol[] = []
  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
  for (const entry of entries) {
    if (!entry.name.endsWith(".svg")) {
      continue
    }
    const file = path.join(directory, entry.name)
    const info = entry.isSymbolicLink() ? fs.statSync(file) : entry
    if (info.isFile()) {
      symbols.push({
        id: entry.name.slice(0, -4),
        markup: fs.readFileSync(file, "utf8"),
        presentation: "authored",
        source: file,
      })
    }
  }
  return symbols
}

/**
 * Resolve discovered built-ins and all directly contained custom SVG files.
 * Custom filenames are exact, case-sensitive IDs. Including unused custom files
 * supports dynamic names. Missing definitions produce warnings; unreadable assets
 * throw before the writer touches the previous sprite. This operation owns its sets.
 */
export function collectSpriteSymbols(
  usage: IconUsage,
  customDirectory: string
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
  const custom = readCustomSymbols(customDirectory)
  const customIds = new Set(custom.map((symbol) => symbol.id))
  for (const symbol of custom) {
    // The writer validates uniqueness across built-ins and authored custom symbols.
    symbols.push(symbol)
    added.add(symbol.id)
  }
  const warnings: string[] = []
  for (const icon of requested) {
    if (!added.has(icon.id)) {
      warnings.push(`Missing icon: ${icon.name} (${icon.description}).`)
    }
  }
  for (const name of usage.customIcons) {
    if (!customIds.has(name)) {
      warnings.push(`Missing custom icon: ${name}. Add ${name}.svg to ${customDirectory}.`)
    }
  }
  return { symbols, warnings }
}
