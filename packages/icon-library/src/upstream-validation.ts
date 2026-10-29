import { BUILT_IN_PRESENTATION_ATTRIBUTES } from "../../icon-sprite/src/sprite-contract.ts"

const rootSvgPattern = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i
const strokeWidthAttributePattern = /\bstroke-width\s*=\s*(["'])(.*?)\1/i
const strokeWidthStylePattern = /\bstyle\s*=\s*(["'])[^"']*\bstroke-width\s*:/i
const rootPresentationStylePattern = new RegExp(
  `\\b(?:${Object.values(BUILT_IN_PRESENTATION_ATTRIBUTES).join("|")})\\s*:`,
  "i"
)

function rootAttribute(attributes: string, name: string): string | undefined {
  return attributes.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2]
}

/**
 * Validate sprite inheritance assumptions and return the authored root presentation.
 * Sync validates before writing; generation carries these defaults into production.
 * Omitted attributes stay absent so native SVG defaults and CSS inheritance apply.
 * Child paint overrides remain authored; child stroke widths remain unsupported.
 */
export function validateUpstreamIcon(svg: string, source: string): Record<string, string> {
  const root = svg.match(rootSvgPattern)
  if (!root) {
    throw new Error(`Invalid built-in SVG ${source}: <svg> root not found.`)
  }
  const presentation: Record<string, string> = {}
  for (const [prop, attribute] of Object.entries(BUILT_IN_PRESENTATION_ATTRIBUTES)) {
    const value = rootAttribute(root[1], attribute)
    if (value !== undefined) {
      presentation[prop] = value
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
  return presentation
}
