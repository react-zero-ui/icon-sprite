import { readdirSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type { IconInfo } from "../src/icon-info.ts"
import { resolveTablerIconsDir } from "./resolve-icon-pack.ts"

type IconPack = IconInfo["pack"]

interface NamedIcon {
  name: string
  pack: IconPack | "custom"
}

interface SkippedIcon {
  collidesWith: NamedIcon
  componentName: string
  pack: IconPack
  reason: "case-collision"
  svgId: string
}

export const LUCIDE_ARCHIVE_DIR = fileURLToPath(new URL("../assets/lucide/", import.meta.url))

const require = createRequire(import.meta.url)

// Tabler corrected these names after 3.43. Preserve our published imports and
// symbol IDs while reading the current SVG filenames and React aliases.
const legacyTablerIcons = {
  IconBrandAdobeAfterEffect: {
    component: "IconBrandAdobeAfterEffects",
    spriteId: "tabler-brand-adobe-after-effect",
  },
  IconBrandKakoTalk: { component: "IconBrandKakaoTalk", spriteId: "tabler-brand-kako-talk" },
  IconCurrencyRubel: { component: "IconCurrencyRuble", spriteId: "tabler-currency-rubel" },
  IconGenderTrasvesti: { component: "IconGenderTravesti", spriteId: "tabler-gender-trasvesti" },
  IconIkosaedr: { component: "IconIcosahedron", spriteId: "tabler-ikosaedr" },
  IconMoodConfuzed: { component: "IconMoodConfused", spriteId: "tabler-mood-confuzed" },
  IconPhysotherapist: { component: "IconPhysiotherapist", spriteId: "tabler-physotherapist" },
  IconSportBillard: { component: "IconSportBilliard", spriteId: "tabler-sport-billard" },
}

function readReactNames(packageName: string, pack: IconPack): Map<string, string> {
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
  // Read canonical declarations, not aliases such as LucideX or XIcon.
  for (const [, name] of declarations.matchAll(
    /declare const (\w+): (?:LucideIcon\b|react\.ForwardRefExoticComponent\b)/g
  )) {
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

function svgFiles(directory: string): string[] {
  return readdirSync(directory)
    .filter((file) => file.endsWith(".svg"))
    .sort()
}

/**
 * Read the canonical SVG sources and decide every public name and sprite ID.
 * Lucide precedes Tabler; sorted filenames win case-insensitive collisions.
 * This preserves historical IDs (for example axis-3-d before axis-3d).
 * Missing dependencies fail before the generator replaces any output.
 */
export function readIconCatalog() {
  const lucideSvgs = Object.fromEntries(
    svgFiles(LUCIDE_ARCHIVE_DIR).map((file) => [
      file,
      readFileSync(path.join(LUCIDE_ARCHIVE_DIR, file), "utf8"),
    ])
  )
  const packs: { pack: IconPack; files: string[]; names: Map<string, string> }[] = [
    {
      pack: "lucide",
      files: Object.keys(lucideSvgs),
      names: readReactNames("lucide-react", "lucide"),
    },
    {
      pack: "tabler",
      files: svgFiles(resolveTablerIconsDir()),
      names: readReactNames("@tabler/icons-react", "tabler"),
    },
  ]
  const mapping: Record<string, IconInfo> = {}
  const skippedIcons: SkippedIcon[] = []
  const generatedNames = new Map<string, NamedIcon>([
    ["customicon", { name: "CustomIcon", pack: "custom" }],
  ])

  for (const { pack, files, names } of packs) {
    for (const svgFile of files) {
      const svgId = svgFile.slice(0, -4)
      const key = svgId.replaceAll("-", "")
      const derivedName = svgId
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("")
      const componentName = names.get(key) ?? `${pack === "tabler" ? "Icon" : ""}${derivedName}`
      const lowerName = componentName.toLowerCase()
      const collidesWith = generatedNames.get(lowerName)
      if (collidesWith) {
        skippedIcons.push({ pack, svgId, componentName, reason: "case-collision", collidesWith })
        continue
      }
      if (pack === "tabler" && !names.has(key)) {
        throw new Error(
          `Missing @tabler/icons-react export for ${svgFile}; install matching Tabler versions`
        )
      }
      generatedNames.set(lowerName, { name: componentName, pack })
      mapping[componentName] = {
        pack,
        spriteId: pack === "tabler" ? `tabler-${svgId}` : svgId,
        svgFile,
      }
    }
  }
  for (const [name, { component, spriteId }] of Object.entries(legacyTablerIcons)) {
    const current = mapping[component]
    if (!current) {
      throw new Error(`Missing Tabler replacement ${component} for published icon ${name}`)
    }
    mapping[name] = { ...current, spriteId }
  }
  return { mapping, lucideSvgs, skippedIcons }
}
