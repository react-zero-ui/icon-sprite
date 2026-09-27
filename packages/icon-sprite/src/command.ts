#!/usr/bin/env node
import { existsSync, realpathSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { generateSprite } from "./build.js"

// Compatibility adapter for published `zero-icons` prebuild scripts. The library
// build API owns all behavior; importing this file performs no generation.
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
