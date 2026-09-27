/**
 * React entrypoint. Handwritten public surface stays stable while icon generation
 * replaces only the catalog under icons/. Node build machinery is exposed through
 * the separate package /build entrypoint and never enters this dependency graph.
 */
export type { ZeroUIConfig } from "./config.js"
export * from "./icons/index.js"
export { CustomIcon } from "./runtime/custom-icon.js"
export type { CustomIconProps, IconProps } from "./runtime/icon.js"
