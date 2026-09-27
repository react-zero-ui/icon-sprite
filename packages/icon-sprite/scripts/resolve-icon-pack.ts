import { createRequire } from "node:module"
import path from "node:path"

const require = createRequire(import.meta.url)

export function resolveTablerIconsDir(): string {
  return path.dirname(require.resolve("@tabler/icons/outline/check.svg"))
}

export function resolveLucideIconsDir(): string {
  return path.dirname(require.resolve("lucide-static/icons/check.svg"))
}
