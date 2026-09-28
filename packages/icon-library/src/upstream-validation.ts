import {
  BUILT_IN_PRESENTATION_ATTRIBUTES,
  BUILT_IN_PRESENTATION_DEFAULTS,
} from "../../icon-sprite/src/sprite-contract.ts"

const rootSvgPattern = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i
const strokeWidthAttributePattern = /\bstroke-width\s*=\s*(["'])(.*?)\1/i
const strokeWidthStylePattern = /\bstyle\s*=\s*(["'])[^"']*\bstroke-width\s*:/i
const rootPresentationStylePattern = new RegExp(
  `\\b(?:${Object.values(BUILT_IN_PRESENTATION_ATTRIBUTES).join("|")})\\s*:`,
  "i"
)
const presentationDefaults: Readonly<Record<string, string>> = BUILT_IN_PRESENTATION_DEFAULTS

function rootAttribute(attributes: string, name: string): string | undefined {
  return attributes.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2]
}

/**
 * Validate the upstream SVG assumptions used by the shared React defaults.
 * Called before synchronization writes assets. Errors identify the source icon.
 * Child paint overrides remain authored; child stroke widths remain unsupported.
 */
export function validateUpstreamIcon(svg: string, source: string): void {
  const root = svg.match(rootSvgPattern)
  if (!root) {
    throw new Error(`Invalid built-in SVG ${source}: <svg> root not found.`)
  }
  for (const [prop, attribute] of Object.entries(BUILT_IN_PRESENTATION_ATTRIBUTES)) {
    const expected = presentationDefaults[prop]
    const actual = rootAttribute(root[1], attribute)
    if (actual !== expected) {
      throw new Error(
        `Unsupported built-in SVG ${source}: root ${attribute} must be "${expected}", found ${actual === undefined ? "none" : JSON.stringify(actual)}.`
      )
    }
  }
  const rootStyle = rootAttribute(root[1], "style")
  if (rootStyle !== undefined && rootPresentationStylePattern.test(rootStyle)) {
    throw new Error(
      `Unsupported built-in SVG ${source}: root style must not redefine built-in presentation defaults.`
    )
  }
  if (strokeWidthAttributePattern.test(root[2]) || strokeWidthStylePattern.test(root[2])) {
    throw new Error(`Unsupported built-in SVG ${source}: descendants must not define stroke-width.`)
  }
}
