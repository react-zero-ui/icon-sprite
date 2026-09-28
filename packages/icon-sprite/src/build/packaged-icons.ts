import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  ICON_CATALOG_FILE,
  iconAssetKey,
  PACKAGED_SVG_FILE,
  parseIconCatalog,
  parsePackagedSvgs,
} from "./icon-data-format.js"

/** Resolved metadata remains useful for a missing SVG or the legacy custom fallback. */
export interface PackagedIcon {
  description: string
  id: string
  svg: string | undefined
}

// src/build and dist/build have the same depth relative to the package data.
const packageDirectory = fileURLToPath(new URL("../../", import.meta.url))
const wordBoundary = /([a-z])([A-Z])/g
const acronymBoundary = /([A-Z])([A-Z][a-z])/g
const letterDigitBoundary = /([a-zA-Z])(\d)/g
const digitLetterBoundary = /(\d)([a-zA-Z])/g

function customSpriteId(name: string): string {
  return name
    .replace(wordBoundary, "$1-$2")
    .replace(acronymBoundary, "$1-$2")
    .replace(letterDigitBoundary, "$1-$2")
    .replace(digitLetterBoundary, "$1-$2")
    .toLowerCase()
}

/**
 * Open installed icon data once for a consumer sprite build.
 * Reads the packaged catalog and SVG bundle, with no upstream or archive access.
 * Unknown names retain the historical custom-file fallback; corrupt data throws.
 */
export function openPackagedIcons(directory = packageDirectory): (name: string) => PackagedIcon {
  const catalogSource = path.join(directory, ICON_CATALOG_FILE)
  const catalog = parseIconCatalog(JSON.parse(readFileSync(catalogSource, "utf8")), catalogSource)
  const svgSource = path.join(directory, PACKAGED_SVG_FILE)
  const svgs = parsePackagedSvgs(JSON.parse(readFileSync(svgSource, "utf8")), svgSource)
  return (name) => {
    const icon = catalog[name]
    if (!icon) {
      const id = customSpriteId(name)
      return { id, svg: undefined, description: `custom: ${id}.svg` }
    }
    return {
      id: icon.spriteId,
      svg: svgs[iconAssetKey(icon)],
      description: `${icon.pack}: ${icon.svgFile}`,
    }
  }
}
