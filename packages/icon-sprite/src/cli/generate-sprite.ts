import { randomUUID } from "node:crypto"
import fs from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
// biome-ignore lint/correctness/noUnresolvedImports: Node resolves svgstore's CommonJS main; isolated package tests verify this import.
import svgstore from "svgstore"
import { loadConfig } from "../config-loader.js"
import type { IconInfo } from "../icon-info.js"
import { scanIcons } from "./scan-icons.js"

const lowerUpperPattern = /([a-z])([A-Z])/g
const acronymPattern = /([A-Z])([A-Z][a-z])/g
const letterDigitPattern = /([a-zA-Z])(\d)/g
const digitLetterPattern = /(\d)([a-zA-Z])/g
const svgRootPattern = /<svg\b/i
const strokeWidthPattern = /stroke-width=(["'])(.*?)\1/g
const require = createRequire(import.meta.url)

interface NamedIconInfo extends IconInfo {
  name: string
}

interface CustomIconInfo {
  name: string
  pack: "custom"
  spriteId: string
  svgFile: string
}

type NeededIcon = CustomIconInfo | NamedIconInfo
type SpriteStore = ReturnType<typeof svgstore>

function customSpriteId(name: string): string {
  return name
    .replace(lowerUpperPattern, "$1-$2")
    .replace(acronymPattern, "$1-$2")
    .replace(letterDigitPattern, "$1-$2")
    .replace(digitLetterPattern, "$1-$2")
    .toLowerCase()
}

function addSvg(store: SpriteStore, id: string, svg: string, source: string): void {
  if (!svgRootPattern.test(svg)) {
    throw new Error(`Invalid SVG in ${source}: <svg> not found.`)
  }
  store.add(
    id,
    svg.replace(
      strokeWidthPattern,
      (_match: string, _quote: string, width: string) =>
        `stroke-width="var(--icon-stroke-width, ${width})"`
    )
  )
}

function createStore(): SpriteStore {
  return svgstore({
    copyAttrs: [
      "viewBox",
      "fill",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "style",
      "size",
    ],
    svgAttrs: { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false" },
  })
}

function neededIcons(icons: string[], mapping: Record<string, IconInfo>): NeededIcon[] {
  return icons.map((name) => {
    if (Object.hasOwn(mapping, name)) {
      return { name, ...mapping[name] }
    }
    const spriteId = customSpriteId(name)
    return { name, pack: "custom", spriteId, svgFile: `${spriteId}.svg` }
  })
}

function isMissingAssetError(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    (error.code === "MODULE_NOT_FOUND" || error.code === "ENOENT")
  )
}

function readBuiltInSvg(icon: NamedIconInfo, lucide: Record<string, string>): string | undefined {
  if (icon.pack === "lucide") {
    return lucide[icon.svgFile]
  }
  try {
    return fs.readFileSync(require.resolve(`@tabler/icons/outline/${icon.svgFile}`), "utf8")
  } catch (error) {
    if (isMissingAssetError(error)) {
      return
    }
    throw error
  }
}

function addBuiltInIcons(
  store: SpriteStore,
  icons: NeededIcon[],
  lucide: Record<string, string>,
  added: Set<string>
): void {
  for (const icon of icons) {
    if (icon.pack === "custom" || added.has(icon.spriteId)) {
      continue
    }
    const svg = readBuiltInSvg(icon, lucide)
    if (svg) {
      addSvg(store, icon.spriteId, svg, `${icon.pack}/${icon.svgFile}`)
      added.add(icon.spriteId)
    }
  }
}

function addCustomSvgs(store: SpriteStore, customDir: string, added: Set<string>): Set<string> {
  const available = new Set<string>()
  if (!fs.existsSync(customDir)) {
    return available
  }
  const entries = fs
    .readdirSync(customDir, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
  for (const entry of entries) {
    if (!entry.name.endsWith(".svg")) {
      continue
    }
    const file = path.join(customDir, entry.name)
    const info = entry.isSymbolicLink() ? fs.statSync(file) : entry
    if (!info.isFile()) {
      continue
    }
    const id = entry.name.slice(0, -4)
    addSvg(store, id, fs.readFileSync(file, "utf8"), file)
    available.add(id)
    added.add(id)
  }
  return available
}

function appendMissingWarnings(
  warnings: string[],
  icons: NeededIcon[],
  customIcons: string[],
  added: Set<string>,
  availableCustom: Set<string>,
  customDir: string
): void {
  for (const icon of icons) {
    if (!added.has(icon.spriteId)) {
      warnings.push(`Missing icon: ${icon.name} (${icon.pack}: ${icon.svgFile}).`)
    }
  }
  for (const name of customIcons) {
    if (!availableCustom.has(name)) {
      warnings.push(`Missing custom icon: ${name}. Add ${name}.svg to ${customDir}.`)
    }
  }
}

function writeSprite(outputFile: string, sprite: string): void {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  const temporaryFile = `${outputFile}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporaryFile, sprite, { encoding: "utf8", flag: "wx" })
    fs.renameSync(temporaryFile, outputFile)
  } finally {
    fs.rmSync(temporaryFile, { force: true })
  }
}

/**
 * Build one consumer's sprite. Reads config once and writes only the output file
 * (and its temporary sibling). Calls for distinct projects share no mutable state
 * and never change cwd. Missing icons are returned as warnings, as in the CLI;
 * parsing, asset, and write failures reject without replacing an existing sprite.
 * Returns { outputFile, iconCount, warnings }; no scan/build import side effects.
 */
export async function generateSprite(projectDir = process.cwd()) {
  const root = path.resolve(projectDir)
  const config = await loadConfig(root)
  const { icons, customIcons, warnings } = scanIcons(root, config)
  const mapping: Record<string, IconInfo> = JSON.parse(
    fs.readFileSync(new URL("../../generated/component-sprite-map.json", import.meta.url), "utf8")
  )
  const lucide: Record<string, string> = JSON.parse(
    fs.readFileSync(new URL("../../generated/lucide-icons.json", import.meta.url), "utf8")
  )
  const store = createStore()
  const added = new Set<string>()
  const needed = neededIcons(icons, mapping)

  addBuiltInIcons(store, needed, lucide, added)

  // All custom SVGs are intentional inputs, including unreferenced/dynamic names.
  const customDir = path.resolve(root, config.OUTPUT_DIR, config.CUSTOM_SVG_DIR)
  const availableCustom = addCustomSvgs(store, customDir, added)
  appendMissingWarnings(warnings, needed, customIcons, added, availableCustom, customDir)

  // SPRITE_PATH is a public URL path: a leading slash stays inside OUTPUT_DIR.
  const outputFile = path.join(root, config.OUTPUT_DIR, config.SPRITE_PATH)
  writeSprite(outputFile, store.toString({ inline: true }))
  return { outputFile, iconCount: added.size, warnings }
}
