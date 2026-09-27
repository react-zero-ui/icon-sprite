---
summary: "Trace packaged manifests and custom assets into sprite symbols; preserve per-consumer isolation, atomic replacement, and warning semantics."
paths:
  - packages/icon-sprite/src/cli/generate-sprite.ts
  - packages/icon-sprite/src/cli/index.ts
  - packages/icon-sprite/src/icon-info.ts
  - packages/icon-sprite/src/svgstore.d.ts
  - packages/icon-sprite/tests/test-sprite.test.js
---

# Sprite Output

[`generateSprite(projectDir)`](../../../packages/icon-sprite/src/cli/generate-sprite.ts) owns one consumer operation: resolve configuration, scan source, resolve SVGs, assemble symbols, and replace the output. It returns `{ outputFile, iconCount, warnings }` and leaves package files and process cwd unchanged.

## Asset ownership

Component names resolve through the packaged catalog manifest. Lucide geometry comes from the packaged SVG manifest; Tabler assets resolve through the installed package's outline exports. Manifest URLs are relative to the module, so the compiled CLI works from a consumer cwd and inside an installed tarball. [Catalog generation](icon-catalog.md) must keep these representations aligned.

Built-in entries deduplicate by symbol ID. Every `.svg` file directly inside the custom directory is also included, including unused files and file symlinks. Custom IDs preserve filename case and omit the extension. Static custom names contribute missing-file warnings; they never restrict the bundled directory.

Unknown mapped names retain a compatibility fallback that derives a custom filename. This allows the builder to diagnose or resolve such names; it does not create new public React exports.

`addSvg` checks for an SVG root and rewrites `stroke-width` to `var(--icon-stroke-width, original)`. The renderer supplies that variable per instance. Preserve this joint contract when changing SVG processing or [runtime styling](../runtime/rendering.md).

## Output and failure contract

Normal leading-slash sprite URLs are joined beneath the configured output directory. Nested parent directories are created. Trusted config paths can contain traversal or external-directory references; the loader's type checks provide no path sandbox.

The complete sprite is serialized before writing a unique temporary sibling. Rename replaces the destination; cleanup removes the temporary file on failure. Parse, asset-processing, and write failures preserve an existing output. Missing definitions remain warnings and can produce a partial sprite with a successful CLI exit.

Distinct consumers have isolated state. Same-target concurrent calls can replace each other's results; the implementation provides no output lock or fsync durability guarantee.

[`index.ts`](../../../packages/icon-sprite/src/cli/index.ts) handles console reporting and exit status. Its direct-execution check resolves bin symlinks, while importing the module leaves generation idle.

## Debug and validation

First compare the rendered fragment ID with emitted symbols, then follow [scanning](source-scanning.md), [catalog](icon-catalog.md), or [configuration](configuration.md). Custom IDs and internal SVG definition IDs need collision review when combining assets.

[`test-sprite`](../../../packages/icon-sprite/tests/test-sprite.test.js) covers both packs, custom inclusion, isolation, nested paths, warning-only misses, failure preservation, and direct bin execution. [Isolated package tests](../development/validation.md) verify published asset resolution and served symbols.
