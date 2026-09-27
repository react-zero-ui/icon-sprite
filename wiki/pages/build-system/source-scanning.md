---
summary: "Debug discovery through the scanner's narrow options and result; preserve binding identity, static-name semantics, and coverage limits."
paths:
  - packages/icon-sprite/src/build/source-scanner.ts
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-sprite/tests/test-scanner-exclusion.test.js
---

# Source Scanning

[`scanIcons(options)`](../../../packages/icon-sprite/src/build/source-scanner.ts) accepts resolved `SourceScanOptions` and returns `IconUsage`. Its private scanner owns Babel, recursion, visited directories, discovered names, and warnings. Babel paths and mutable scan state stay inside this module.

## Coverage model

The scanner parses JS, JSX, TS, and TSX without loading consumer Babel configuration or executing application source. Directory exclusions match basenames recursively. Realpath tracking prevents linked-directory cycles; trusted symlinks can reach sources outside the selected tree.

Imports must exactly match the configured package name. Binding references preserve aliases, shadowing, and usage before declarations. Unused imports and references confined to TypeScript types are excluded. Static namespace access works; dynamic computed access warns. Discovery reflects source references, including code a bundler might later remove.

There is no cross-module graph traversal. Direct re-export declarations, wildcard exports, CommonJS requires, and dynamic imports have no discovery handler. Local barrels work when a scanned file itself imports and references the icons.

## Names and diagnostics

Legacy generic `Icon` syntax requires a statically evaluable name. A later spread can invalidate an earlier name; a later explicit name can establish it again. This scanner capability creates no public generic component.

Static `CustomIcon` names are diagnostic hints. [Asset collection](sprite-output.md) includes every custom SVG to support dynamic names. Ordinary icons' `name` props do not select further icons.

Presentation warnings inspect explicit JSX attributes and use the shared [sprite contract](../../../packages/icon-sprite/src/sprite-contract.ts). Spreads and wrapper-generated props need separate review. Parse errors and unresolved generic names throw with source locations; unsupported dynamic namespace access stays warning-only.

One documented complexity exception keeps related import-binding logic together. Review that complete operation before splitting it. [`test-scanner-exclusion`](../../../packages/icon-sprite/tests/test-scanner-exclusion.test.js) exercises the discovery contract through resolved project inputs.
