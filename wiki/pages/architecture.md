---
summary: "Locate the React, consumer-build, and icon-library modules and their shared contracts."
paths:
  - packages/icon-library/package.json
  - packages/icon-library/src/
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/build/icon-data-format.ts
  - packages/icon-sprite/src/sprite-contract.ts
---

# Architecture

## Domain ownership

| Domain | Entry and responsibility | Detailed contract |
| --- | --- | --- |
| `packages/icon-library` | Private workspace owns canonical icon source, upstream synchronization, validation, and generation into the product workspace. | [Icon library](icon-library.md) |
| `packages/icon-sprite/src/react/` | Named components exported by `src/index.ts` render icon instances. | [React rendering](react/rendering.md) |
| `packages/icon-sprite/src/build/` | `buildSpriteSheet()` through `src/build.ts` writes a consuming application's sprite. | [Sprite output](build-system/sprite-output.md) |

`packages/icon-sprite/src/icons/`, `packages/icon-sprite/assets/`, and `dist/icon-assets.json` are generated product inputs. [Workflow](development/workflow.md) owns execution order; [publishing](development/publishing.md) owns the installed interface and artifact boundary.

## Shared contracts

[icon-data-format.ts](../../packages/icon-sprite/src/build/icon-data-format.ts) is the product's pure packaged-data contract. Private icon-library generation imports it while producing `icon-sprite`; consumer builds read the generated data. There is no dependency from compiled `icon-sprite` code back to `icon-library`.

[sprite-contract.ts](../../packages/icon-sprite/src/sprite-contract.ts) defines product presentation assumptions used by React, sprite serialization, and private ingestion validation. Keep it browser-safe. [Code quality](development/code-quality.md) owns enforcement.
