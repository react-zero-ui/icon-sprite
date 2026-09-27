import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

/** Maintainer-to-consumer manifest record. Public names are keys in the mapping. */
export interface IconInfo {
  pack: "lucide" | "tabler"
  spriteId: string
  svgFile: string
}

export interface CatalogData {
  lucideSvgs: Record<string, string>
  mapping: Record<string, IconInfo>
}

/** Resolved metadata remains useful when an SVG is missing or is a custom fallback. */
export interface CatalogIcon {
  description: string
  id: string
  svg: string | undefined
}

const packageDirectory = fileURLToPath(new URL("../", import.meta.url))
const mappingFile = "generated/component-sprite-map.json"
const lucideFile = "generated/lucide-icons.json"
const require = createRequire(import.meta.url)
const wordBoundary = /([a-z])([A-Z])/g
const acronymBoundary = /([A-Z])([A-Z][a-z])/g
const letterDigitBoundary = /([a-zA-Z])(\d)/g
const digitLetterBoundary = /(\d)([a-zA-Z])/g

function objectRecord(value: unknown, source: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid icon manifest ${source}: expected an object.`)
  }
  return { ...value }
}

/**
 * Own both directions of the on-disk manifest protocol. Called only by maintainers.
 * Keep filenames and JSON shape here so consumer code never duplicates them.
 */
export function writeCatalog(directory: string, catalog: CatalogData): void {
  mkdirSync(path.join(directory, "generated"), { recursive: true })
  writeFileSync(path.join(directory, mappingFile), `${JSON.stringify(catalog.mapping, null, 2)}\n`)
  writeFileSync(path.join(directory, lucideFile), `${JSON.stringify(catalog.lucideSvgs)}\n`)
}

function readCatalog(directory: string): CatalogData {
  const mappingSource = path.join(directory, mappingFile)
  const lucideSource = path.join(directory, lucideFile)
  const entries = objectRecord(JSON.parse(readFileSync(mappingSource, "utf8")), mappingSource)
  const mapping: Record<string, IconInfo> = Object.create(null)
  for (const [name, value] of Object.entries(entries)) {
    const entry = objectRecord(value, `${mappingSource}#${name}`)
    if (
      (entry.pack !== "lucide" && entry.pack !== "tabler") ||
      typeof entry.spriteId !== "string" ||
      typeof entry.svgFile !== "string"
    ) {
      throw new Error(`Invalid icon manifest entry ${mappingSource}#${name}.`)
    }
    mapping[name] = { pack: entry.pack, spriteId: entry.spriteId, svgFile: entry.svgFile }
  }
  const svgEntries = objectRecord(JSON.parse(readFileSync(lucideSource, "utf8")), lucideSource)
  const lucideSvgs: Record<string, string> = Object.create(null)
  for (const [file, svg] of Object.entries(svgEntries)) {
    if (typeof svg !== "string") {
      throw new Error(`Invalid SVG manifest entry ${lucideSource}#${file}.`)
    }
    lucideSvgs[file] = svg
  }
  return { mapping, lucideSvgs }
}

/**
 * Open the packaged catalog once for a consumer operation. Resolution hides pack
 * locations and legacy custom-name normalization. A missing asset returns metadata
 * with an absent SVG; corrupt manifests and unexpected I/O failures throw.
 * Directory injection supports isolated protocol tests, without mutable globals.
 */
export function openCatalog(directory = packageDirectory): (name: string) => CatalogIcon {
  const { mapping, lucideSvgs } = readCatalog(directory)
  return (name) => {
    const icon = mapping[name]
    if (!icon) {
      const id = name
        .replace(wordBoundary, "$1-$2")
        .replace(acronymBoundary, "$1-$2")
        .replace(letterDigitBoundary, "$1-$2")
        .replace(digitLetterBoundary, "$1-$2")
        .toLowerCase()
      return { id, svg: undefined, description: `custom: ${id}.svg` }
    }
    let svg: string | undefined
    if (icon.pack === "lucide") {
      svg = lucideSvgs[icon.svgFile]
    } else {
      try {
        svg = readFileSync(require.resolve(`@tabler/icons/outline/${icon.svgFile}`), "utf8")
      } catch (error) {
        if (
          !(
            error instanceof Error &&
            "code" in error &&
            (error.code === "ENOENT" || error.code === "MODULE_NOT_FOUND")
          )
        ) {
          throw error
        }
      }
    }
    return { id: icon.spriteId, svg, description: `${icon.pack}: ${icon.svgFile}` }
  }
}
