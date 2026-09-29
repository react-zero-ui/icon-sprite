---
summary: "Change canonical icons safely: additive upgrades, validation before copying, and reproducible component generation."
paths:
  - packages/icon-library/package.json
  - packages/icon-library/src/
  - packages/icon-library/assets/
  - packages/icon-sprite/src/build/icon-data-format.ts
  - packages/icon-sprite/src/sprite-contract.ts
---

# Icon Library

## Canonical state

[catalog.ts](../../packages/icon-library/src/catalog.ts) owns the committed name-to-asset catalog, archive reads, and packaged SVG generation. Existing public identities survive upstream releases. Several component names may reference one SVG; packaged data stores its bytes once.

Canonical inputs live only under `packages/icon-library/assets/`. Generated copies under `packages/icon-sprite/assets/` are disposable package inputs. The producer imports the product's [data-format contract](../../packages/icon-sprite/src/build/icon-data-format.ts); published code has no import back to this workspace.

## Upstream updates

[syncUpstreamIcons](../../packages/icon-library/src/upstream-sync.ts) reads upstream dependencies owned by this private workspace. It adds new identities and refreshes SVG bytes while retaining entries and files absent from upstream. When a component keeps its name but its SVG filename changes, the historical filename receives the new bytes and its sprite ID stays stable. Case-insensitive name collisions are skipped and counted; cross-pack identity changes fail.

[validateUpstreamIcon](../../packages/icon-library/src/upstream-validation.ts) checks both packs before copying begins. Roots must match the product [presentation contract](react/rendering.md); root style overrides and descendant stroke widths are rejected. Intentional descendant paint values remain authored. Run `npm run sync:icons` from repository root.

Synchronization has two phases. Planning reads and validates both packs, resolves declarations and identities, and snapshots SVG/license bytes in memory. Application writes that snapshot and then the catalog. Input or identity failures leave canonical files unchanged; filesystem failures during application can require Git recovery. Retained historical files are never scheduled for deletion.

## Generated components

[generateIconPackage](../../packages/icon-library/src/component-generation.ts) writes generated React components, package-ready catalog/licenses, and the deduplicated SVG bundle into `packages/icon-sprite`. Generation never synchronizes upstream. `packages/icon-sprite/scripts/build.ts` removes old compiled output, invokes this generator, then compiles the published package.

Follow [workflow](development/workflow.md) for compilation order and [validation](development/validation.md) for compatibility and repeatability checks.
