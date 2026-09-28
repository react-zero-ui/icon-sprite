import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export type IconPack = "lucide" | "tabler"

/** Permanent package-owned identity for one public icon component. */
export interface IconInfo {
  pack: IconPack
  spriteId: string
  svgFile: string
}

export type IconCatalog = Record<string, IconInfo>

/** Resolved metadata remains useful when an SVG is missing or is a custom fallback. */
export interface CatalogIcon {
  description: string
  id: string
  svg: string | undefined
}

const packageDirectory = fileURLToPath(new URL("../", import.meta.url))
const catalogFile = "assets/catalog.json"
const assetBundleFile = "dist/icon-assets.json"
const wordBoundary = /([a-z])([A-Z])/g
const acronymBoundary = /([A-Z])([A-Z][a-z])/g
const letterDigitBoundary = /([a-zA-Z])(\d)/g
const digitLetterBoundary = /(\d)([a-zA-Z])/g

function objectRecord(value: unknown, source: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid icon catalog ${source}: expected an object.`)
  }
  return { ...value }
}

/**
 * Read the canonical public catalog. The catalog is committed source, not build
 * output: sync operations add to it but never infer compatibility from upstream.
 */
export function readCatalog(directory = packageDirectory): IconCatalog {
  const source = path.join(directory, catalogFile)
  const entries = objectRecord(JSON.parse(readFileSync(source, "utf8")), source)
  const catalog: IconCatalog = Object.create(null)
  for (const [name, value] of Object.entries(entries)) {
    const entry = objectRecord(value, `${source}#${name}`)
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

/** Write the canonical catalog deterministically after a maintainer sync. */
export function writeCatalog(directory: string, catalog: IconCatalog): void {
  const sorted = Object.fromEntries(
    Object.entries(catalog).sort(([left], [right]) => left.localeCompare(right))
  )
  mkdirSync(path.join(directory, "assets"), { recursive: true })
  writeFileSync(path.join(directory, catalogFile), `${JSON.stringify(sorted, null, 2)}\n`)
}

function assetKey(info: IconInfo): string {
  return `${info.pack}/${info.svgFile}`
}

/**
 * Build the consumer asset bundle from canonical archives. Raw archives remain
 * repository source; the npm package needs only this deterministic derived file.
 */
export function writeAssetBundle(directory: string): number {
  const catalog = readCatalog(directory)
  const assets: Record<string, string> = Object.create(null)
  for (const info of Object.values(catalog)) {
    const key = assetKey(info)
    if (assets[key] === undefined) {
      assets[key] = readFileSync(path.join(directory, "assets", key), "utf8")
    }
  }
  const sorted = Object.fromEntries(
    Object.entries(assets).sort(([left], [right]) => left.localeCompare(right))
  )
  mkdirSync(path.join(directory, "dist"), { recursive: true })
  writeFileSync(path.join(directory, assetBundleFile), `${JSON.stringify(sorted)}\n`)
  return Object.keys(sorted).length
}

function readAssetBundle(directory: string): Record<string, string> {
  const source = path.join(directory, assetBundleFile)
  const entries = objectRecord(JSON.parse(readFileSync(source, "utf8")), source)
  const assets: Record<string, string> = Object.create(null)
  for (const [key, value] of Object.entries(entries)) {
    if (typeof value !== "string") {
      throw new Error(`Invalid icon asset bundle entry ${source}#${key}.`)
    }
    assets[key] = value
  }
  return assets
}

function customSpriteId(name: string): string {
  return name
    .replace(wordBoundary, "$1-$2")
    .replace(acronymBoundary, "$1-$2")
    .replace(letterDigitBoundary, "$1-$2")
    .replace(digitLetterBoundary, "$1-$2")
    .toLowerCase()
}

/**
 * Open package-owned icon data for one consumer build. No upstream icon package
 * participates here; missing archived files return metadata with an absent SVG.
 */
export function openCatalog(directory = packageDirectory): (name: string) => CatalogIcon {
  const catalog = readCatalog(directory)
  const assets = readAssetBundle(directory)
  return (name) => {
    const icon = catalog[name]
    if (!icon) {
      const id = customSpriteId(name)
      return { id, svg: undefined, description: `custom: ${id}.svg` }
    }
    return {
      id: icon.spriteId,
      svg: assets[assetKey(icon)],
      description: `${icon.pack}: ${icon.svgFile}`,
    }
  }
}
