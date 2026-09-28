/**
 * Wire contract between the generated sprite and React rendering.
 * Keep this module browser-safe: maintainer scripts also import it directly.
 * Consumer config controls disk locations; applications serve those files at
 * these stable URLs. No consumer build may mutate a shared installation.
 */
export const SPRITE_PATH = "/icons.svg"
export const CUSTOM_SVG_DIR = "zero-ui-icons"
export const DEFAULT_ICON_SIZE = 24

/** Shared root defaults validated for every package-owned Lucide/Tabler SVG. */
export const BUILT_IN_PRESENTATION_DEFAULTS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** React presentation prop to serialized SVG attribute mapping, kept complete with the defaults. */
export const BUILT_IN_PRESENTATION_ATTRIBUTES = {
  fill: "fill",
  stroke: "stroke",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
} as const satisfies Record<keyof typeof BUILT_IN_PRESENTATION_DEFAULTS, string>

/** Presentation props not covered by the built-in dev/production parity contract. */
export const RISKY_SPRITE_PRESENTATION_PROPS = [
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
