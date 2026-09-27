// biome-ignore lint/performance/noNamespaceImport: Biome cannot resolve React's named Suspense export in this package shape; namespace access is verified by TypeScript and integration tests.
import * as React from "react"
import { SPRITE_PATH } from "./config.js"
import { type IconProps as BaseIconProps, renderUse } from "./render-use.js"

export interface IconProps extends BaseIconProps {
  name: string
}

// Dev-only client renderer. In production this becomes `null` and is tree-shaken.
const DevIcon =
  process.env.NODE_ENV === "development" ? React.lazy(() => import("./custom-dev-icon.js")) : null

export function CustomIcon({ name, ...props }: IconProps) {
  if (process.env.NODE_ENV === "development" && DevIcon) {
    const fallback = renderUse(name, SPRITE_PATH, props)
    return (
      <React.Suspense fallback={fallback}>
        <DevIcon name={name} {...props} />
      </React.Suspense>
    )
  }
  return renderUse(name, SPRITE_PATH, props)
}

export default CustomIcon
