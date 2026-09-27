---
summary: "Own public component names and sprite IDs; preserve historical Lucide assets and Tabler aliases when changing generators or dependencies."
paths:
  - packages/icon-sprite/scripts/icon-catalog.ts
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/scripts/collect-lucide-icons.ts
  - packages/icon-sprite/scripts/resolve-icon-pack.ts
  - packages/icon-sprite/src/catalog.ts
  - packages/icon-sprite/tests/test-catalog.test.js
  - packages/icon-sprite/assets/lucide/
  - packages/icon-sprite/package.json
  - package-lock.json
  - packages/icon-sprite/tests/test-lucide-compat.test.js
  - packages/icon-sprite/tests/test-mapping.test.js
  - packages/icon-sprite/tests/test-sprite-id-match.test.js
  - packages/icon-sprite/tests/test-tabler-resolution.test.js
---

# Icon Catalog and Generation

## Canonical inputs

[`readIconCatalog`](../../../packages/icon-sprite/scripts/icon-catalog.ts) owns the mapping from public component name to `{ pack, spriteId, svgFile }`. Lucide reads the committed SVG archive. Tabler reads installed outline assets. Both use installed React declarations to recover canonical component names.

[`collectLucideIcons`](../../../packages/icon-sprite/scripts/collect-lucide-icons.ts) refreshes installed Lucide SVG bytes while retaining files removed upstream. Ordinary generation leaves this archive unchanged. A Lucide dependency upgrade requires an explicit collection step before rebuilding; otherwise new declarations can outpace archived assets. Existing filenames can receive new geometry during collection, so review asset changes too.

Pack discovery uses package export resolution in [`resolve-icon-pack.ts`](../../../packages/icon-sprite/scripts/resolve-icon-pack.ts). Hardcoded package-local `node_modules` paths break under workspace hoisting.

## Compatibility rules

The catalog processes Lucide before Tabler and sorts SVG filenames. Names are compared case-insensitively, with `CustomIcon` reserved. The first collision wins; skipped entries retain their reason and winner in generated diagnostics. Ordering preserves historical IDs such as `arrow-down-a-z` and `axis-3-d`. Filename normalization changes therefore affect the public contract.

Tabler symbol IDs have a `tabler-` prefix. `legacyTablerIcons` preserves earlier public spellings and symbol IDs after upstream corrections while using current asset filenames. Generated development wrappers still import the historical React alias, so upgrades must preserve that alias or update the generator's explicit mapping.

Declaration parsing understands specific upstream declaration shapes. A dependency update can break naming even when SVGs remain present. Keep paired React/static icon packages compatible and verify exports after upgrading.

## Derived representations

[`generateIcons`](../../../packages/icon-sprite/scripts/generate-icons.ts) derives wrappers, local Lucide components, the generated icon barrel, and manifests. The handwritten `src/index.ts` exposes the icon barrel together with custom rendering and public types; generation leaves this interface intact.

[`catalog.ts`](../../../packages/icon-sprite/src/catalog.ts) owns the packaged `IconInfo` representation, manifest filenames, serialization, validation, and consumer lookup. Both the generator and asset collector use this module. `writeCatalog` writes maintainer data; `openCatalog` returns a resolver that hides installed pack locations and missing-asset metadata. [`test-catalog`](../../../packages/icon-sprite/tests/test-catalog.test.js) tests protocol agreement and corrupt input diagnostics.

It finishes reading and rendering before replacing generated directories. Filesystem writes across the whole generated tree form a sequence; interrupted generation requires rebuilding. Keep handwritten files outside those directories.

## Verification routes

[`test-mapping`](../../../packages/icon-sprite/tests/test-mapping.test.js) checks output completeness and reproducibility from another cwd. [`test-lucide-compat`](../../../packages/icon-sprite/tests/test-lucide-compat.test.js) checks archive retention and canonical names. [`test-sprite-id-match`](../../../packages/icon-sprite/tests/test-sprite-id-match.test.js) connects wrappers to symbol IDs and historical Tabler aliases.

For intentional naming changes, compare old and new maps as well: self-consistent new output alone cannot establish compatibility with every previous release. Continue through [validation](../development/validation.md) before publishing.
