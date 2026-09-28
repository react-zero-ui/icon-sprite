import type { ReactElement, SVGProps } from "react"
import {
  BUILT_IN_PRESENTATION_DEFAULTS,
  DEFAULT_ICON_SIZE,
  SPRITE_PATH,
} from "../sprite-contract.js"

/**
 * SVG instance props. Explicit width/height override size independently; zero is valid.
 * Props target the outer SVG. Attributes fixed inside a sprite symbol can override
 * presentation values; library symbols inherit the supported root defaults.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string }

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
