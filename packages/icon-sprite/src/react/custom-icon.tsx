// biome-ignore lint/performance/noNamespaceImport: Biome cannot resolve React's named Suspense export in this package shape; namespace access is verified by TypeScript and integration tests.
import * as React from "react"
import { customIconId } from "../sprite-contract.js"
import { type CustomIconProps, renderSvgUseElement } from "./icon.js"

// The lazy browser loader exists only in development so production bundlers can erase it.
const DevelopmentCustomIcon =
  process.env.NODE_ENV === "development" ? React.lazy(() => import("./custom-icon-dev.js")) : null

/**
 * Render an SVG from `public/` using an inline `src` (e.g. `src="/brand/logo.svg"`).
 * Development loads the source; `zero-icons` bundles it into the production sprite.
 */
export function CustomIcon({ src, ...rest }: CustomIconProps) {
  const id = customIconId(src)
  if (process.env.NODE_ENV === "development" && DevelopmentCustomIcon) {
    const fallback = renderSvgUseElement(id, rest)
    return (
      <React.Suspense fallback={fallback}>
        <DevelopmentCustomIcon key={src} src={src} {...rest} />
      </React.Suspense>
    )
  }
  return renderSvgUseElement(id, rest)
}

export default CustomIcon
