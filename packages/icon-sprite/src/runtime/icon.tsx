import type { ReactElement, SVGProps } from "react"
import {
  BUILT_IN_PRESENTATION_DEFAULTS,
  DEFAULT_ICON_SIZE,
  SPRITE_PATH,
} from "../sprite-contract.js"

/**
 * SVG instance props. Explicit width/height override size independently; zero is valid.
 * Props target the outer SVG. Attributes fixed inside a sprite symbol can override
 * presentation values; generated built-ins keep strokeWidth inheritable.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string }

/** Exact custom filename stem, including case, without the .svg extension. */
export interface CustomIconProps extends IconProps {
  name: string
}

/** Resolve the same dimension precedence for inline, custom, and sprite rendering. */
export function iconDimensions({ size, width, height }: IconProps): {
  width: number | string
  height: number | string
} {
  return { width: width ?? size ?? DEFAULT_ICON_SIZE, height: height ?? size ?? DEFAULT_ICON_SIZE }
}

/**
 * Render one production symbol. Callers supply identity and instance props only;
 * this module owns the URL, dimensions, and ARIA default. Explicit outer SVG
 * attributes retain caller precedence.
 */
export function renderIcon(id: string, { size, width, height, ...rest }: IconProps): ReactElement {
  return (
    <svg aria-hidden="true" {...rest} {...iconDimensions({ size, width, height })}>
      <use href={`${SPRITE_PATH}#${id}`} />
    </svg>
  )
}

/** Built-in packs share validated root presentation defaults. */
export function renderBuiltInIcon(id: string, props: IconProps): ReactElement {
  return renderIcon(id, { ...BUILT_IN_PRESENTATION_DEFAULTS, ...props })
}
