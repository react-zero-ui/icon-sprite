/**
 * Data contract between icon-library generation and the installed sprite builder.
 * Both sides share these paths, keys, and decoders; this module performs no I/O.
 */
export const ICON_CATALOG_FILE = "assets/catalog.json"
export const PACKAGED_SVG_FILE = "dist/icon-assets.json"

export type IconPack = "lucide" | "tabler"

/** Stable public identity; svgFile is relative to the icon pack's archive. */
export interface IconInfo {
  pack: IconPack
  spriteId: string
  svgFile: string
}

export type IconCatalog = Record<string, IconInfo>

function objectRecord(value: unknown, source: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid icon catalog ${source}: expected an object.`)
  }
  return { ...value }
}

/** Decode catalog entries without allowing inherited object names to resolve as icons. */
export function parseIconCatalog(value: unknown, source: string): IconCatalog {
  const entries = objectRecord(value, source)
  const catalog: IconCatalog = Object.create(null)
  for (const [name, entryValue] of Object.entries(entries)) {
    const entry = objectRecord(entryValue, `${source}#${name}`)
    if (
      (entry.pack !== "lucide" && entry.pack !== "tabler") ||
      typeof entry.spriteId !== "string" ||
      typeof entry.svgFile !== "string"
    ) {
      throw new Error(`Invalid icon catalog entry ${source}#${name}.`)
    }
    catalog[name] = { pack: entry.pack, spriteId: entry.spriteId, svgFile: entry.svgFile }
  }
  return catalog
}

/** One asset may supply several historical component names and sprite IDs. */
export function iconAssetKey(info: IconInfo): string {
  return `${info.pack}/${info.svgFile}`
}

/** Decode the deduplicated SVG bundle produced alongside the compiled package. */
export function parsePackagedSvgs(value: unknown, source: string): Record<string, string> {
  const entries = objectRecord(value, source)
  const assets: Record<string, string> = Object.create(null)
  for (const [key, svg] of Object.entries(entries)) {
    if (typeof svg !== "string") {
      throw new Error(`Invalid icon asset bundle entry ${source}#${key}.`)
    }
    assets[key] = svg
  }
  return assets
}
