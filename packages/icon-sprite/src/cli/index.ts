#!/usr/bin/env node
import { existsSync, realpathSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { generateSprite } from "./generate-sprite.js"

// Importing the bin has no side effects; direct execution runs one operation.
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
) {
  try {
    const result = await generateSprite()
    for (const warning of result.warnings) {
      console.warn(warning)
    }
    console.log(`Built ${result.outputFile} with ${result.iconCount} icons.`)
  } catch (error) {
    console.error(`zero-icons: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
