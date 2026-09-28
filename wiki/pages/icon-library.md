---
summary: "Change canonical icons safely: additive upgrades, validation before copying, and reproducible component generation."
paths:
  - packages/icon-sprite/icon-library/
  - packages/icon-sprite/src/build/icon-data-format.ts
  - packages/icon-sprite/src/sprite-contract.ts
---

# Icon Library

## Canonical state

[catalog.ts](../../packages/icon-sprite/icon-library/catalog.ts) owns the committed name-to-asset catalog, archive reads, and packaged SVG generation. Existing public identities survive upstream releases. Several component names may reference one SVG; packaged data stores its bytes once.

Canonical inputs live under `assets/`. The producer and consumer reader share the [data-format contract](../../packages/icon-sprite/src/build/icon-data-format.ts). Preserve that single format owner when changing serialization; [publishing](development/publishing.md) defines which artifacts ship.

## Upstream updates

[syncUpstreamIcons](../../packages/icon-sprite/icon-library/upstream-sync.ts) reads installed upstream development dependencies. It adds new identities and refreshes SVG bytes while retaining entries and files absent from upstream. When a component keeps its name but its SVG filename changes, the historical filename receives the new bytes and its sprite ID stays stable. Case-insensitive name collisions are skipped and counted; cross-pack identity changes fail.

[validateUpstreamIcon](../../packages/icon-sprite/icon-library/upstream-validation.ts) checks both packs before copying begins. Roots must match the shared [presentation contract](react/rendering.md); root style overrides and descendant stroke widths are rejected. Intentional descendant paint values remain authored. License texts accompany imported assets. Review catalog, asset, and collision changes after the [sync command](../../README.md#icon-generation).

## Generated components

[generateIconComponents](../../packages/icon-sprite/icon-library/component-generation.ts) reads committed inputs and replaces only `src/icons/`, preserving the handwritten entrypoint. All source reads and rendering finish before prior generated files are removed. Ordinary package builds use these inputs without synchronizing upstream.

Follow [workflow](development/workflow.md) for compilation order and [validation](development/validation.md) for compatibility and repeatability checks.
