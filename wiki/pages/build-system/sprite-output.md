---
summary: "Follow the Node build operation through asset collection and atomic writing without exposing manifests, XML state, or config interpretation."
paths:
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/build/icon-assets.ts
  - packages/icon-sprite/src/build/sprite-writer.ts
  - packages/icon-sprite/src/catalog.ts
  - packages/icon-sprite/src/command.ts
  - packages/icon-sprite/tests/test-sprite.test.js
---

# Sprite Output

[`generateSprite(projectDirectory)`](../../../packages/icon-sprite/src/build.ts) is the Node integration interface. It resolves a project, discovers usage, collects symbols, writes the result, and returns `{ outputFile, iconCount, warnings }`. Each call owns its operation state and leaves cwd and package files unchanged.

## Asset boundary

[`collectSymbols`](../../../packages/icon-sprite/src/build/icon-assets.ts) accepts semantic icon usage and the resolved custom directory. [`openCatalog`](../../../packages/icon-sprite/src/catalog.ts) hides manifests, upstream SVG lookup, and legacy custom-name normalization. Unknown built-in names can resolve to custom filenames; this compatibility fallback creates no public React export.

Built-in symbols deduplicate by ID. Every `.svg` directly inside the custom directory is included, including unused files and file symlinks. Custom IDs preserve case. Static custom names affect warnings, never inclusion. Existing custom/built-in collisions remain possible and require input review.

The resulting `SpriteSymbol` contains identity, markup, and a source label for diagnostics. The orchestration layer knows neither pack locations nor XML representation.

## Writer boundary

[`writeSprite`](../../../packages/icon-sprite/src/build/sprite-writer.ts) owns svgstore, SVG-root checks, attribute copying, stroke-width rewriting, and atomic replacement. The CSS variable comes from the shared [sprite contract](../../../packages/icon-sprite/src/sprite-contract.ts), also consumed by rendering.

Serialization completes before writing a unique temporary sibling. Rename replaces the destination; failure cleanup removes the temporary file. Parse, manifest, asset-processing, and write failures preserve an existing sprite. Missing definitions remain warnings and can produce a partial successful result.

Distinct projects remain isolated. Same-target concurrent calls are last-writer-wins; there is no lock or fsync guarantee. Inputs are trusted SVG assets and config paths.

[`command.ts`](../../../packages/icon-sprite/src/command.ts) adapts the result to historical `zero-icons` stdout/stderr and exit status. Applications can call the same operation directly. [`test-sprite`](../../../packages/icon-sprite/tests/test-sprite.test.js) verifies both interfaces and failure behavior; [isolated installation](../development/validation.md) checks the packaged operation in Next configuration.
