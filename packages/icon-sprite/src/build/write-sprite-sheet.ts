import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
// biome-ignore lint/correctness/noUnresolvedImports: Node resolves svgstore's CommonJS main; isolated package tests verify the dependency.
import svgstore from "svgstore"
import { BUILT_IN_PRESENTATION_ATTRIBUTES } from "../sprite-contract.js"

/** Provider-independent input; source is included in malformed-SVG diagnostics. */
export interface SpriteSymbol {
  id: string
  markup: string
  presentation: "authored" | "inherit"
  source: string
}

const svgRoot = /<svg\b/i
// Symbol identity comes from the filename; its viewport size comes from <use>.
const instanceAttributes = new Set(["id", "width", "height"])
const inheritedPresentationAttributes = Object.fromEntries(
  Object.values(BUILT_IN_PRESENTATION_ATTRIBUTES).map((attribute) => [attribute, "inherit"])
)

/**
 * Assemble XML and atomically replace one sprite; return the distinct symbol count.
 * SVG is trusted project content. Root checking validates the expected container;
 * callers accepting untrusted SVG need a separate sanitization boundary.
 * Serialization finishes before writing a sibling temp file. Failure preserves the
 * existing target; concurrent writers to the same path remain last-writer-wins.
 * Duplicate symbol IDs fail with both sources before any output is replaced.
 */
export function writeSpriteSheet(outputFile: string, symbols: readonly SpriteSymbol[]): number {
  const store = svgstore({
    copyAttrs: ["viewBox", ...Object.values(BUILT_IN_PRESENTATION_ATTRIBUTES), "style", "size"],
  })
  // svgAttrs also targets nested SVGs during serialization. Set sheet attributes
  // on the container alone so custom viewports retain their authored semantics.
  store.element("svg").first().attr({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
  })
  const sources = new Map<string, string>()
  for (const symbol of symbols) {
    const previousSource = sources.get(symbol.id)
    if (previousSource !== undefined) {
      throw new Error(
        `Duplicate sprite ID "${symbol.id}" in ${previousSource} and ${symbol.source}. Rename the custom SVG so each icon has a unique ID.`
      )
    }
    sources.set(symbol.id, symbol.source)
    if (!svgRoot.test(symbol.markup)) {
      throw new Error(`Invalid SVG in ${symbol.source}: <svg> not found.`)
    }
    if (symbol.presentation === "inherit") {
      store.add(symbol.id, symbol.markup, { symbolAttrs: inheritedPresentationAttributes })
    } else {
      // Reuse svgstore's XML parser to preserve every authored root attribute,
      // including namespaces, style, and paint values outside our built-in contract.
      const xml = store.element.load(symbol.markup, { xmlMode: true })
      const root = xml("svg").first()
      const attributes = root.attr()
      if (!attributes) {
        throw new Error(`Invalid SVG in ${symbol.source}: <svg> not found.`)
      }
      const authoredAttributes = Object.fromEntries(
        Object.entries(attributes).filter(([attribute]) => !instanceAttributes.has(attribute))
      )
      // svgstore.add() gathers contents from every nested SVG, flattening viewports.
      // Move only this root's children; nested SVGs and local definitions stay intact.
      const customSymbol = xml("<symbol/>")
        .attr({ ...authoredAttributes, id: symbol.id })
        .append(root.contents())
      store.element("svg").first().append(customSymbol)
    }
  }
  const markup = store.toString({ inline: true })
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  const temporaryFile = `${outputFile}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporaryFile, markup, { encoding: "utf8", flag: "wx" })
    fs.renameSync(temporaryFile, outputFile)
  } finally {
    fs.rmSync(temporaryFile, { force: true })
  }
  return sources.size
}
