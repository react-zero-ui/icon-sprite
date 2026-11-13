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

/** Resolved metadata includes diagnostics when a catalog name is unknown. */
export interface PackagedIcon {
  description: string
  id: string
  svg: string | undefined
}

// src/build and dist/build have the same depth relative to the package data.
const packageDirectory = fileURLToPath(new URL("../../", import.meta.url))
/**
 * Open installed icon data once for a consumer sprite build.
 * Reads the packaged catalog and SVG bundle, with no upstream or archive access.
 * Unknown names produce diagnostics; corrupt data throws.
 */
export function openPackagedIcons(directory = packageDirectory): (name: string) => PackagedIcon {
  const catalogSource = path.join(directory, ICON_CATALOG_FILE)
  const catalog = parseIconCatalog(JSON.parse(readFileSync(catalogSource, "utf8")), catalogSource)
  const svgSource = path.join(directory, PACKAGED_SVG_FILE)
  const svgs = parsePackagedSvgs(JSON.parse(readFileSync(svgSource, "utf8")), svgSource)
  return (name) => {
    const icon = catalog[name]
    if (!icon) {
      return { id: name, svg: undefined, description: `unknown icon: ${name}` }
    }
    return {
      id: icon.spriteId,
      svg: svgs[iconAssetKey(icon)],
      description: `${icon.pack}: ${icon.svgFile}`,
    }
  }
}
