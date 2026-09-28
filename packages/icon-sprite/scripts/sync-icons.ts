#!/usr/bin/env node
import { syncUpstreamIcons } from "../icon-library/upstream-sync.ts"

const result = syncUpstreamIcons()
console.log(
  `Synced ${result.copied.lucide} Lucide and ${result.copied.tabler} Tabler SVGs; added ${result.added} public icons, retained ${result.retained}, skipped ${result.skippedCollisions} case collisions.`
)
