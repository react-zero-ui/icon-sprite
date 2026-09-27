/**
 * Wire contract between the generated sprite and React rendering.
 * Keep this module browser-safe: maintainer scripts also import it directly.
 * Consumer config controls disk locations; applications serve those files at
 * these stable URLs. No consumer build may mutate a shared installation.
 */
export const SPRITE_PATH = "/icons.svg"
export const CUSTOM_SVG_DIR = "zero-ui-icons"
export const DEFAULT_ICON_SIZE = 24
export const STROKE_WIDTH_PROPERTY = "--icon-stroke-width"

/** Presentation props whose values can be shadowed by attributes inside a symbol. */
export const SPRITE_PRESENTATION_PROPS = [
  "stroke",
  "fill",
  "color",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "fillOpacity",
  "fillRule",
  "opacity",
  "transform",
  "vectorEffect",
] as const
