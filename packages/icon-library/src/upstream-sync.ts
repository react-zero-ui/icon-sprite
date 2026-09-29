import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type {
  IconCatalog,
  IconInfo,
  IconPack,
} from "../../icon-sprite/src/build/icon-data-format.ts"
import { readCanonicalCatalog, writeCanonicalCatalog } from "./catalog.ts"
import { validateUpstreamIcon } from "./upstream-validation.ts"

interface UpstreamPack {
  archiveDirectory: string
  iconDirectory: string
  licenseFile: string
  pack: IconPack

  reactPackage: string
}

export interface UpstreamSyncResult {
  added: number
  copied: Record<IconPack, number>
  retained: number
  skippedCollisions: number
}

const packageDirectory = fileURLToPath(new URL("../", import.meta.url))
const require = createRequire(import.meta.url)
const declarationPattern =
  /declare const (\w+): (?:LucideIcon\b|react\.ForwardRefExoticComponent\b)/g

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

/** Snapshot validated bytes so the apply phase writes exactly what was reviewed. */
function readUpstreamSvgs(pack: UpstreamPack): Map<string, string> {
  const svgs = new Map<string, string>()
  for (const file of svgFiles(pack.iconDirectory)) {
    const svg = readFileSync(path.join(pack.iconDirectory, file), "utf8")
    validateUpstreamIcon(svg, `${pack.pack}/${file}`)
    svgs.set(file, svg)
  }
  return svgs
}

function readCanonicalNames(packageName: string, pack: IconPack): Map<string, string> {
  const packageFile = require.resolve(`${packageName}/package.json`)
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

/** Merge identities in memory and plan archived filenames, including historical aliases. */
function planCurrentIcons(
  catalog: IconCatalog,
  pack: UpstreamPack,
  svgs: ReadonlyMap<string, string>
): { added: number; skippedCollisions: number; updates: Map<string, string> } {
  const names = readCanonicalNames(pack.reactPackage, pack.pack)
  const updates = new Map(svgs)
  const namesByCase = new Map(Object.keys(catalog).map((name) => [name.toLowerCase(), name]))
  const referencedFiles = new Set(
    Object.values(catalog)
      .filter((entry) => entry.pack === pack.pack)
      .map((entry) => entry.svgFile)
  )
  let added = 0
  let skippedCollisions = 0
  for (const [svgFile, svg] of svgs) {
    const key = svgFile.slice(0, -4).replaceAll("-", "")
    const componentName =
      names.get(key) ??
      (pack.pack === "lucide" ? derivedComponentName(pack.pack, svgFile) : undefined)
    if (!componentName) {
      if (referencedFiles.has(svgFile)) {
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
        // Plan the historical filename too so public name and sprite ID stay stable.
        updates.set(existing.svgFile, svg)
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
    referencedFiles.add(svgFile)
    added += 1
  }
  return { added, skippedCollisions, updates }
}

/**
 * Synchronize current Lucide and Tabler releases into package-owned state.
 * Existing catalog entries and archived files are never deleted automatically.
 * Both packs' SVGs, declarations, identities, and licenses are read and validated
 * before the first write. Planning errors leave canonical state untouched.
 * Filesystem failures during application can leave partial writes; Git owns recovery.
 */
export function syncUpstreamIcons(directory = packageDirectory): UpstreamSyncResult {
  const catalog = readCanonicalCatalog(directory)
  const retained = Object.keys(catalog).length
  let added = 0
  let skippedCollisions = 0
  const copied: Record<IconPack, number> = { lucide: 0, tabler: 0 }
  const licenses = path.join(directory, "assets/licenses")
  const writes = new Map<string, string>()

  // Phase one resolves every possible input/identity error without touching the archive.
  for (const pack of upstreamPacks(directory)) {
    const svgs = readUpstreamSvgs(pack)
    copied[pack.pack] = svgs.size
    const merged = planCurrentIcons(catalog, pack, svgs)
    added += merged.added
    skippedCollisions += merged.skippedCollisions
    for (const [file, svg] of merged.updates) {
      writes.set(path.join(pack.archiveDirectory, file), svg)
    }
    writes.set(path.join(licenses, `${pack.pack}.txt`), readFileSync(pack.licenseFile, "utf8"))
  }

  // Phase two applies the snapshot. Absence upstream never schedules a deletion.
  for (const [file, content] of writes) {
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, content)
  }

  writeCanonicalCatalog(directory, catalog)
  return { added, copied, retained, skippedCollisions }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = syncUpstreamIcons()
  console.log(
    `Synced ${result.copied.lucide} Lucide and ${result.copied.tabler} Tabler SVGs; added ${result.added} public icons, retained ${result.retained}, skipped ${result.skippedCollisions} case collisions.`
  )
}
