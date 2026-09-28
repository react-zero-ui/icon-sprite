import { buildSpriteSheet } from "@react-zero-ui/icon-sprite/build"
import type { NextConfig } from "next"
import { PHASE_PRODUCTION_BUILD } from "next/constants.js"

/** Generate assets within the application's build; development keeps inline icons. */
export default async function configureNext(phase: string): Promise<NextConfig> {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const { warnings } = await buildSpriteSheet()
    for (const warning of warnings) {
      console.warn(warning)
    }
  }
  return {}
}
