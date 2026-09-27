import type { ComponentType, CSSProperties, ReactElement, SVGProps } from "react"
import { DEFAULT_ICON_SIZE, SPRITE_PATH, STROKE_WIDTH_PROPERTY } from "../sprite-contract.js"

/**
 * SVG instance props. Explicit width/height override size independently; zero is valid.
 * Props target the outer SVG. Attributes fixed inside a sprite symbol can override
 * presentation values; strokeWidth crosses that boundary through the shared CSS variable.
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

type IconStyle = CSSProperties & { [STROKE_WIDTH_PROPERTY]?: IconProps["strokeWidth"] }

/**
 * Render one production symbol. Callers supply identity and instance props only;
 * this module owns the URL, dimensions, ARIA default, and CSS transport contract.
 * Explicit aria-hidden and style values retain caller precedence.
 */
export function renderIcon(
  id: string,
  { size, width, height, style, strokeWidth, ...rest }: IconProps
): ReactElement {
  const iconStyle: IconStyle | undefined =
    strokeWidth != null ? { [STROKE_WIDTH_PROPERTY]: strokeWidth, ...style } : style
  return (
    <svg
      aria-hidden="true"
      {...rest}
      {...iconDimensions({ size, width, height })}
      style={iconStyle}
    >
      <use href={`${SPRITE_PATH}#${id}`} />
    </svg>
  )
}

/**
 * Adapt common icon props to an inline development component. Width and height
 * remain optional here because upstream components derive their own SVG geometry.
 * Keep environment branching in generated wrappers so bundlers can erase DevIcon.
 */
export function renderInline(
  Icon: ComponentType<IconProps>,
  { size, width, height, ...rest }: IconProps
): ReactElement {
  return (
    <Icon
      {...rest}
      size={size ?? DEFAULT_ICON_SIZE}
      {...(width != null ? { width } : {})}
      {...(height != null ? { height } : {})}
    />
  )
}
