#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { LUCIDE_ARCHIVE_DIR } from "./icon-catalog.ts"
import { resolveLucideIconsDir } from "./resolve-icon-pack.ts"

/** Refresh installed Lucide SVGs byte-for-byte without deleting historical icons or generating code. */
export function collectLucideIcons(archiveDir = LUCIDE_ARCHIVE_DIR): number {
  const sourceDir = resolveLucideIconsDir()
  const files = readdirSync(sourceDir).filter((file) => file.endsWith(".svg"))
  mkdirSync(archiveDir, { recursive: true })
  for (const file of files) {
    copyFileSync(path.join(sourceDir, file), path.join(archiveDir, file))
  }
  return files.length
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(
    `Updated ${collectLucideIcons()} Lucide SVGs in ${LUCIDE_ARCHIVE_DIR}; historical icons retained.`
  )
}
