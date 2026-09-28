/**
 * Node entrypoint for building a consuming application's icons.svg.
 * generateSprite remains an alias for existing build integrations.
 */

export type { SpriteBuildResult } from "./build/build-sprite-sheet.js"
export {
  buildSpriteSheet,
  buildSpriteSheet as generateSprite,
} from "./build/build-sprite-sheet.js"
