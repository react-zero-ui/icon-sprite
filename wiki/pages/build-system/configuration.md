---
summary: "Debug source roots, config precedence and caching, and the separation between output paths and served URLs."
paths:
  - packages/icon-sprite/src/config.ts
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-sprite/src/build/resolve-build-config.ts
---

# Consumer Configuration

[resolveSpriteBuildConfig](../../../packages/icon-sprite/src/build/resolve-build-config.ts) interprets configuration once and returns absolute paths plus scanner options. [config.ts](../../../packages/icon-sprite/src/config.ts) owns public fields and value validation.

## Resolution behavior

TypeScript config takes precedence over JavaScript. Each candidate runs only when the previous candidate is absent or invalid. Invalid candidates add warnings and fall back; unknown fields are ignored and array overrides replace defaults. Config modules are trusted Node code, including their relative imports and normal module cache. Source is rescanned on each build, while config edits in an existing process retain Node's caching behavior.

Explicit `ROOT_DIR` wins; otherwise detection tries `src`, `app`, then `pages`. The final `src` fallback can still fail if absent. Config paths and followed symlinks require trusted inputs.

## Output paths and URLs

Build settings change disk locations. React URLs remain those in the [sprite contract](../../../packages/icon-sprite/src/sprite-contract.ts): `/icons.svg` and `/zero-ui-icons/`. Alternate output locations require corresponding hosting. Any future configurable-URL design must preserve per-consumer isolation and development/production agreement.

[Sprite output](sprite-output.md) owns warning aggregation and failure preservation.
