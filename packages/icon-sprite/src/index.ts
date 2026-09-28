/**
 * React entrypoint. Imports create React renderers only and never scan source or
 * generate files. Generated icons remain under icons/; shared URL and presentation
 * defaults are owned by the React renderer and sprite contract. Node build machinery
 * stays behind the separate package /build entrypoint.
 */
export type { ZeroUIConfig } from "./config.js"
export * from "./icons/index.js"
export { CustomIcon } from "./react/custom-icon.js"
export type { CustomIconProps, IconProps } from "./react/icon.js"
