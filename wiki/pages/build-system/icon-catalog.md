---
summary: "Own public component names, sprite IDs, cumulative Lucide/Tabler SVG archives, and manual upstream synchronization."
paths:
  - packages/icon-sprite/scripts/sync-icons.ts
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/src/catalog.ts
  - packages/icon-sprite/assets/catalog.json
  - packages/icon-sprite/assets/lucide/
  - packages/icon-sprite/assets/tabler/
  - packages/icon-sprite/assets/licenses/
  - packages/icon-sprite/package.json
  - package-lock.json
  - packages/icon-sprite/tests/test-catalog.test.js
  - packages/icon-sprite/tests/test-icon-sync.test.js
  - packages/icon-sprite/tests/test-mapping.test.js
  - packages/icon-sprite/tests/test-sprite-id-match.test.js
---

# Icon Catalog and Synchronization

## Canonical state

[`assets/catalog.json`](../../../packages/icon-sprite/assets/catalog.json) is the permanent mapping from public component name to `{ pack, spriteId, svgFile }`. `assets/lucide/` and `assets/tabler/` hold cumulative SVG archives. These committed files define the package independently of whichever upstream release is installed today.

[`catalog.ts`](../../../packages/icon-sprite/src/catalog.ts) owns catalog validation, deterministic writing, and the derived consumer SVG bundle. Consumer sprite builds read the committed catalog plus `dist/icon-assets.json`, which package build regenerates from canonical archives.

## Manual upstream sync

[`sync-icons.ts`](../../../packages/icon-sprite/scripts/sync-icons.ts) is the only upstream import path. `npm run sync:icons --workspace @react-zero-ui/icon-sprite` reads current Lucide/Tabler SVG packages and React declarations, copies current SVG bytes into the archives, and merges new canonical names into the existing catalog.

Sync never deletes an existing catalog entry or archived SVG automatically. Upstream removal therefore leaves published icons intact. When upstream keeps a component name but changes its SVG filename, sync refreshes bytes under the historical filename so the public sprite ID remains stable. New case-insensitive name collisions are skipped for review. Cross-pack identity changes fail.

Lucide and Tabler packages are dev dependencies used only for sync. They are not consumer dependencies and do not participate in normal generation or sprite builds. Their license texts are copied to `assets/licenses/`.

## Generation

[`generate-icons.ts`](../../../packages/icon-sprite/scripts/generate-icons.ts) reads only committed catalog/assets. It derives public wrappers with inline development SVG implementations and the generated icon barrel. Package build also derives one SVG data bundle for consumer sprite generation. Development and production therefore originate from the same canonical SVG bytes without shipping thousands of raw archive files.

Generation finishes reading and rendering before replacing generated directories. Invalid catalog entries or SVGs fail before prior generated output is removed.

## Verification

[`test-icon-sync`](../../../packages/icon-sprite/tests/test-icon-sync.test.js) checks that every public mapping resolves to a committed SVG, manual sync is additive, historical files survive, licenses are copied, and upstream packages remain dev-only. [`test-mapping`](../../../packages/icon-sprite/tests/test-mapping.test.js) checks generation completeness and local component ownership. [`test-sprite-id-match`](../../../packages/icon-sprite/tests/test-sprite-id-match.test.js) protects published IDs and legacy names.

Before release after a sync, review catalog/asset diffs and run full [validation](../development/validation.md).
