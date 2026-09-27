import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
// biome-ignore lint/correctness/noUnresolvedImports: Node resolves svgstore's CommonJS main; isolated package tests verify the dependency.
import svgstore from "svgstore"
import { STROKE_WIDTH_PROPERTY } from "../sprite-contract.js"

/** Provider-independent input; source is included in malformed-SVG diagnostics. */
export interface SpriteSymbol {
  id: string
  markup: string
  source: string
}

const svgRoot = /<svg\b/i
const strokeWidth = /stroke-width=(["'])(.*?)\1/g

/**
 * Assemble XML and atomically replace one sprite; return the distinct symbol count.
 * SVG is trusted project content. Root checking validates the expected container;
 * callers accepting untrusted SVG need a separate sanitization boundary.
 * Serialization finishes before writing a sibling temp file. Failure preserves the
 * existing target; concurrent writers to the same path remain last-writer-wins.
 */
export function writeSprite(outputFile: string, symbols: readonly SpriteSymbol[]): number {
  const store = svgstore({
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
  for (const symbol of symbols) {
    if (!svgRoot.test(symbol.markup)) {
      throw new Error(`Invalid SVG in ${symbol.source}: <svg> not found.`)
    }
    store.add(
      symbol.id,
      symbol.markup.replace(
        strokeWidth,
        (_match, _quote, width) => `stroke-width="var(${STROKE_WIDTH_PROPERTY}, ${width})"`
      )
    )
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
  return new Set(symbols.map((symbol) => symbol.id)).size
}
