import type { AriaAttributes, DOMAttributes, ReactElement, SVGProps } from "react"
import {
  BUILT_IN_PRESENTATION_DEFAULTS,
  DEFAULT_ICON_SIZE,
  SPRITE_PATH,
} from "../sprite-contract.js"

/**
 * Supported icon instance props. Width/height override size independently; zero is valid.
 * Styling and events target the outer SVG. Built-in symbols inherit paint defaults;
 * custom artwork keeps authored values. Geometry, children, and upstream-specific
 * conveniences are owned by the icon, so they are excluded from this interface.
 */
export interface IconProps
  extends AriaAttributes,
    Omit<DOMAttributes<SVGSVGElement>, "children" | "dangerouslySetInnerHTML">,
    Pick<
      SVGProps<SVGSVGElement>,
      | "className"
      | "color"
      | "fill"
      | "focusable"
      | "height"
      | "id"
      | "ref"
      | "role"
      | "stroke"
      | "strokeLinecap"
      | "strokeLinejoin"
      | "strokeWidth"
      | "style"
      | "tabIndex"
      | "width"
    > {
  size?: number | string
  [attribute: `data-${string}`]: string | number | boolean | undefined
}

/** Exact custom filename stem, including case, without the .svg extension. */
export interface CustomIconProps extends IconProps {
  name: string
}

/** Resolve explicit dimensions, then size, then the package default; zero remains valid. */
export function resolveIconDimensions({ size, width, height }: IconProps): {
  width: number | string
  height: number | string
} {
  return { width: width ?? size ?? DEFAULT_ICON_SIZE, height: height ?? size ?? DEFAULT_ICON_SIZE }
}

/**
 * Render the shared React <svg><use /></svg> shape for a sprite symbol. This
 * module owns the public sprite URL, dimensions, and ARIA default; explicit
 * outer SVG props retain caller precedence. Rendering has no file-generation
 * or other build side effects.
 */
export function renderSvgUseElement(
  id: string,
  { size, width, height, ...rest }: IconProps
): ReactElement {
  return (
    <svg aria-hidden="true" {...rest} {...resolveIconDimensions({ size, width, height })}>
      <use href={`${SPRITE_PATH}#${id}`} />
    </svg>
  )
}

/** Render a production built-in icon with the package-owned root presentation defaults. */
export function renderProdIcon(id: string, props: IconProps): ReactElement {
  return renderSvgUseElement(id, { ...BUILT_IN_PRESENTATION_DEFAULTS, ...props })
}
