#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  type IconCatalog,
  type IconInfo,
  type IconPack,
  readCatalog,
  writeCatalog,
} from "../src/catalog.ts"

interface UpstreamPack {
  archiveDirectory: string
  iconDirectory: string
  licenseFile: string
  pack: IconPack
  reactPackage: string
}

export interface SyncSummary {
  added: number
  copied: Record<IconPack, number>
  retained: number
  skippedCollisions: number
}

const packageDirectory = fileURLToPath(new URL("../", import.meta.url))
const require = createRequire(import.meta.url)
const declarationPattern =
  /declare const (\w+): (?:LucideIcon\b|react\.ForwardRefExoticComponent\b)/g

function resolveReactPackage(packageName: string): string {
  return require.resolve(`${packageName}/package.json`)
}

function upstreamPacks(directory: string): UpstreamPack[] {
  const lucideDirectory = path.dirname(require.resolve("lucide-static/icons/check.svg"))
  const tablerDirectory = path.dirname(require.resolve("@tabler/icons/outline/check.svg"))
  return [
    {
      archiveDirectory: path.join(directory, "assets/lucide"),
      iconDirectory: lucideDirectory,
      licenseFile: path.resolve(lucideDirectory, "../LICENSE"),
      pack: "lucide",
      reactPackage: "lucide-react",
    },
    {
      archiveDirectory: path.join(directory, "assets/tabler"),
      iconDirectory: tablerDirectory,
      licenseFile: path.resolve(tablerDirectory, "../../LICENSE"),
      pack: "tabler",
      reactPackage: "@tabler/icons-react",
    },
  ]
}

function svgFiles(directory: string): string[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".svg"))
    .sort((left, right) => left.localeCompare(right))
}

/**
 * Copy current upstream bytes into a cumulative archive. Files absent upstream
 * remain untouched, which is the core compatibility guarantee.
 */
export function syncArchive(sourceDirectory: string, archiveDirectory: string): string[] {
  const files = svgFiles(sourceDirectory)
  mkdirSync(archiveDirectory, { recursive: true })
  for (const file of files) {
    copyFileSync(path.join(sourceDirectory, file), path.join(archiveDirectory, file))
  }
  return files
}

function readCanonicalNames(packageName: string, pack: IconPack): Map<string, string> {
  const packageFile = resolveReactPackage(packageName)
  const metadata: { types?: string; typings?: string } = JSON.parse(
    readFileSync(packageFile, "utf8")
  )
  const declarationFile = metadata.types ?? metadata.typings
  if (!declarationFile) {
    throw new Error(`No declaration entrypoint found in ${packageName}`)
  }
  const declarations = readFileSync(
    path.resolve(path.dirname(packageFile), declarationFile),
    "utf8"
  )
  const names = new Map<string, string>()
  for (const [, name] of declarations.matchAll(declarationPattern)) {
    if (pack === "lucide" && !name.startsWith("Lucide") && !name.endsWith("Icon")) {
      names.set(name.toLowerCase(), name)
    } else if (pack === "tabler" && name.startsWith("Icon")) {
      names.set(name.slice(4).toLowerCase(), name)
    }
  }
  if (names.size === 0) {
    throw new Error(`No icon declarations found in ${packageName}`)
  }
  return names
}

function currentIconInfo(pack: IconPack, svgFile: string): IconInfo {
  const svgId = svgFile.slice(0, -4)
  return {
    pack,
    spriteId: pack === "tabler" ? `tabler-${svgId}` : svgId,
    svgFile,
  }
}

function derivedComponentName(pack: IconPack, svgFile: string): string {
  const name = svgFile
    .slice(0, -4)
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("")
  return pack === "tabler" ? `Icon${name}` : name
}

function addCurrentIcons(
  catalog: IconCatalog,
  pack: UpstreamPack,
  files: string[]
): { added: number; skippedCollisions: number } {
  const names = readCanonicalNames(pack.reactPackage, pack.pack)
  const namesByCase = new Map(Object.keys(catalog).map((name) => [name.toLowerCase(), name]))
  let added = 0
  let skippedCollisions = 0
  for (const svgFile of files) {
    const key = svgFile.slice(0, -4).replaceAll("-", "")
    const alreadyReferenced = Object.values(catalog).some(
      (entry) => entry.pack === pack.pack && entry.svgFile === svgFile
    )
    const componentName =
      names.get(key) ??
      (pack.pack === "lucide" ? derivedComponentName(pack.pack, svgFile) : undefined)
    if (!componentName) {
      if (alreadyReferenced) {
        continue
      }
      throw new Error(
        `Missing ${pack.reactPackage} component for current ${pack.pack} asset ${svgFile}.`
      )
    }
    const info = currentIconInfo(pack.pack, svgFile)
    const existing = catalog[componentName]
    if (existing) {
      if (existing.pack !== info.pack) {
        throw new Error(
          `Upstream moved published icon ${componentName} between packs; review the compatibility mapping manually.`
        )
      }
      if (existing.svgFile !== info.svgFile) {
        // Upstream occasionally renames an SVG while keeping the React component.
        // Refresh bytes under our historical filename so public name and sprite ID stay stable.
        copyFileSync(
          path.join(pack.iconDirectory, svgFile),
          path.join(pack.archiveDirectory, existing.svgFile)
        )
      }
      continue
    }
    const caseCollision = namesByCase.get(componentName.toLowerCase())
    if (caseCollision) {
      skippedCollisions += 1
      continue
    }
    catalog[componentName] = info
    namesByCase.set(componentName.toLowerCase(), componentName)
    added += 1
  }
  return { added, skippedCollisions }
}

/**
 * Synchronize current Lucide and Tabler releases into package-owned state.
 * Existing catalog entries and archived files are never deleted automatically.
 */
export function syncIcons(directory = packageDirectory): SyncSummary {
  const catalog = readCatalog(directory)
  const retained = Object.keys(catalog).length
  let added = 0
  let skippedCollisions = 0
  const copied: Record<IconPack, number> = { lucide: 0, tabler: 0 }
  const licenses = path.join(directory, "assets/licenses")
  mkdirSync(licenses, { recursive: true })

  for (const pack of upstreamPacks(directory)) {
    const files = syncArchive(pack.iconDirectory, pack.archiveDirectory)
    copied[pack.pack] = files.length
    const merged = addCurrentIcons(catalog, pack, files)
    added += merged.added
    skippedCollisions += merged.skippedCollisions
    copyFileSync(pack.licenseFile, path.join(licenses, `${pack.pack}.txt`))
  }

  writeCatalog(directory, catalog)
  return { added, copied, retained, skippedCollisions }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = syncIcons()
  console.log(
    `Synced ${result.copied.lucide} Lucide and ${result.copied.tabler} Tabler SVGs; added ${result.added} public icons, retained ${result.retained}, skipped ${result.skippedCollisions} case collisions.`
  )
}
