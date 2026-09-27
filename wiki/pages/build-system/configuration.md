---
summary: "Resolve config precedence, source-root selection, warning fallbacks, and the separation between CLI path overrides and runtime URLs."
paths:
  - packages/icon-sprite/src/config.ts
  - packages/icon-sprite/src/config-loader.ts
  - packages/icon-sprite/src/cli/generate-sprite.ts
  - packages/icon-sprite/src/custom-dev-icon.tsx
  - packages/icon-sprite/tests/test-config.test.js
  - packages/icon-sprite/tests/test-sprite.test.js
---

# Consumer Configuration

## Separate runtime and build settings

[`config.ts`](../../../packages/icon-sprite/src/config.ts) supplies client-safe constants and the `ZeroUIConfig` type. [`loadConfig(projectDir)`](../../../packages/icon-sprite/src/config-loader.ts) resolves settings for one consumer and belongs exclusively to Node-side build code.

User overrides affect CLI input and output paths. Runtime wrappers keep `/icons.svg`; the custom development loader keeps `/zero-ui-icons/`. An application choosing another output location must expose those assets at the runtime URLs. Updating `SPRITE_PATH` in the consumer config alone cannot change the rendered `href`. This separation keeps a shared installation independent of any one consumer's settings.

## Resolution contract

The supplied project directory anchors config discovery and source-root detection. The CLI supplies its cwd by default. Callers operating on several projects pass explicit roots.

`zero-ui.config.ts` takes precedence over `zero-ui.config.js`. Default exports, named exports, and CommonJS JavaScript configuration are supported. Config modules execute through Node's loader, including relative imports. They are trusted project code and use Node's module cache. Repeated generation rescans source; changing a config module within the same process requires accounting for that cache.

Invalid files or values warn, then allow the next config file or defaults. Validation accepts known string settings and arrays of strings. Array overrides replace defaults. A typo in an unknown key is ignored. Read warnings before diagnosing an unexpected fallback.

Source detection chooses the first existing directory among `src`, `app`, and `pages`. It selects one tree. Applications with other source locations need an explicit `ROOT_DIR`. The final `src` fallback can still fail when that directory is absent.

Returned arrays are fresh per call; mutating a result leaves other consumers and runtime defaults unchanged. Avoid introducing process-wide resolved configuration.

## Debug route

For an empty or unexpected sprite, inspect resolved root and exclusions before [scanner behavior](source-scanning.md). For correct output served at the wrong location, follow [sprite output](sprite-output.md) and [rendering](../runtime/rendering.md).

[`test-config`](../../../packages/icon-sprite/tests/test-config.test.js) covers precedence, value validation, relative imports, source detection, and call isolation. [`test-sprite`](../../../packages/icon-sprite/tests/test-sprite.test.js) covers nested output paths and multiple consumers.
