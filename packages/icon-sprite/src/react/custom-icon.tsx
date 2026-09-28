// biome-ignore lint/performance/noNamespaceImport: Biome cannot resolve React's named Suspense export in this package shape; namespace access is verified by TypeScript and integration tests.
import * as React from "react"
import { type CustomIconProps, renderSvgUseElement } from "./icon.js"

// The lazy browser loader exists only in development so production bundlers can erase it.
const DevelopmentCustomIcon =
  process.env.NODE_ENV === "development" ? React.lazy(() => import("./custom-icon-dev.js")) : null

/**
 * Render a trusted custom asset by filename stem. Development lazily loads the
 * browser SVG asset while other environments render the shared sprite <use>.
 * The sprite URL/defaults belong to icon.tsx, and rendering never generates files.
 * Keying the loader by name prevents payload and DOM attributes leaking across assets.
 */
export function CustomIcon({ name, ...rest }: CustomIconProps) {
  if (process.env.NODE_ENV === "development" && DevelopmentCustomIcon) {
    const fallback = renderSvgUseElement(name, rest)
    return (
      <React.Suspense fallback={fallback}>
        <DevelopmentCustomIcon key={name} name={name} {...rest} />
      </React.Suspense>
    )
  }
  return renderSvgUseElement(name, rest)
}

export default CustomIcon
