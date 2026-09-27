// biome-ignore lint/performance/noNamespaceImport: Biome cannot resolve React's named Suspense export in this package shape; namespace access is verified by TypeScript and integration tests.
import * as React from "react"
import { type CustomIconProps, renderIcon } from "./icon.js"

// Dev-only client renderer. In production this becomes `null` and is tree-shaken.
const DevIcon =
  process.env.NODE_ENV === "development" ? React.lazy(() => import("./custom-icon-dev.js")) : null

/**
 * Render a trusted custom asset by filename stem. Development loads a client SVG;
 * other environments use its sprite symbol. Remounting on name changes prevents
 * a previous asset's payload and DOM attributes from leaking into its replacement.
 */
export function CustomIcon({ name, ...props }: CustomIconProps) {
  if (process.env.NODE_ENV === "development" && DevIcon) {
    const fallback = renderIcon(name, props)
    return (
      <React.Suspense fallback={fallback}>
        <DevIcon key={name} name={name} {...props} />
      </React.Suspense>
    )
  }
  return renderIcon(name, props)
}

export default CustomIcon
