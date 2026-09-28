import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  ICON_CATALOG_FILE,
  type IconCatalog,
  type IconInfo,
  iconAssetKey,
  PACKAGED_SVG_FILE,
  parseIconCatalog,
} from "../src/build/icon-data-format.ts"

const packageDirectory = fileURLToPath(new URL("../", import.meta.url))

/** Read the committed identities that synchronization must preserve across upgrades. */
export function readCanonicalCatalog(directory = packageDirectory): IconCatalog {
  const source = path.join(directory, ICON_CATALOG_FILE)
  return parseIconCatalog(JSON.parse(readFileSync(source, "utf8")), source)
}

/** Deterministically persist an already-merged catalog; upstream sync owns additive policy. */
export function writeCanonicalCatalog(directory: string, catalog: IconCatalog): void {
  const sorted = Object.fromEntries(
    Object.entries(catalog).sort(([left], [right]) => left.localeCompare(right))
  )
  mkdirSync(path.join(directory, "assets"), { recursive: true })
  writeFileSync(path.join(directory, ICON_CATALOG_FILE), `${JSON.stringify(sorted, null, 2)}\n`)
}

/** Read archived SVG bytes. Ordinary component generation never resolves upstream packages. */
export function readCanonicalSvg(info: IconInfo, directory = packageDirectory): string {
  return readFileSync(path.join(directory, "assets", iconAssetKey(info)), "utf8")
}

/**
 * Package each referenced SVG once, even when several public names share it.
 * This library-generation step owns writing the bundle; consumers only read it.
 * Complete all reads before replacing the previous derived data.
 */
export function writePackagedIconData(directory = packageDirectory): number {
  const catalog = readCanonicalCatalog(directory)
  const assets: Record<string, string> = Object.create(null)
  for (const info of Object.values(catalog)) {
    const key = iconAssetKey(info)
    if (assets[key] === undefined) {
      assets[key] = readCanonicalSvg(info, directory)
    }
  }
  const sorted = Object.fromEntries(
    Object.entries(assets).sort(([left], [right]) => left.localeCompare(right))
  )
  mkdirSync(path.join(directory, "dist"), { recursive: true })
  writeFileSync(path.join(directory, PACKAGED_SVG_FILE), `${JSON.stringify(sorted)}\n`)
  return Object.keys(sorted).length
}
