---
summary: "Locate the React, consumer-build, and icon-library modules and their shared contracts."
paths:
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/build/icon-data-format.ts
  - packages/icon-sprite/src/sprite-contract.ts
---

# Architecture

## Domain ownership

| Domain | Entry and responsibility | Detailed contract |
| --- | --- | --- |
| `src/react/` | Named components exported by `src/index.ts` render icon instances. | [React rendering](react/rendering.md) |
| `src/build/` | `buildSpriteSheet()` through `src/build.ts` writes a consuming application's sprite. | [Sprite output](build-system/sprite-output.md) |
| `icon-library/` | Synchronization and generation maintain the canonical library and produce package inputs. | [Icon library](icon-library.md) |

`src/icons/` is generated React source. Command scripts invoke domain operations and sequence compilation. [Workflow](development/workflow.md) owns execution order; [publishing](development/publishing.md) owns the installed interface and artifact boundary.

## Shared contracts

[icon-data-format.ts](../../packages/icon-sprite/src/build/icon-data-format.ts) is the pure format contract between the icon-library producer and installed-data reader. Canonical writes stay in `icon-library/`; consumer builds only read packaged data.

[sprite-contract.ts](../../packages/icon-sprite/src/sprite-contract.ts) connects React defaults, upstream validation, and symbol serialization. Keep it browser-safe. React rendering has no dependency on Node build machinery; consumer builds have no dependency on React or icon-library execution. [Code quality](development/code-quality.md) owns enforcement.
