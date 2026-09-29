---
summary: "Change consumer sprite construction: packaged lookup, custom inclusion, symbol presentation policy, and atomic output."
paths:
  - packages/icon-sprite/src/build/build-sprite-sheet.ts
  - packages/icon-sprite/src/build/collect-sprite-symbols.ts
  - packages/icon-sprite/src/build/write-sprite-sheet.ts
  - packages/icon-sprite/src/build/packaged-icons.ts
---

# Sprite Output

[buildSpriteSheet](../../../packages/icon-sprite/src/build/build-sprite-sheet.ts) resolves config, scans usage, collects symbols, and writes the file. It returns file/count/warnings without console reporting. Calls own their state and leave cwd and installed package files unchanged. [Configuration](configuration.md) and [scanning](source-scanning.md) own input discovery.

## Symbol selection

[collectSpriteSymbols](../../../packages/icon-sprite/src/build/collect-sprite-symbols.ts) resolves imported names through [packaged-icons.ts](../../../packages/icon-sprite/src/build/packaged-icons.ts). Lookup uses installed JSON data. Unknown names retain a legacy custom-filename fallback without creating React exports.

Built-ins deduplicate by ID. Every SVG directly inside the custom directory is included, including unused files and file symlinks, so dynamic names work. Custom IDs are exact case-sensitive filename stems. Static custom names affect warnings only. The writer rejects duplicate symbol IDs with both sources before replacing output. Internal SVG definition IDs still require collision review.

## Serialization and failure contract

[writeSpriteSheet](../../../packages/icon-sprite/src/build/write-sprite-sheet.ts) receives markup plus an `inherit` or `authored` policy. Per-symbol svgstore options implement the [built-in presentation contract](../react/rendering.md#instance-props). Custom roots retain every authored attribute except source ID and dimensions, which belong to the icon instance. Fixed custom paint is preserved. SVG input is trusted and root checking is limited container validation.

Custom serialization converts only the outer root to a symbol through the existing XML parser. Nested SVG viewports and local definitions remain inside that symbol. Avoid `svgstore.add()` for custom subtrees: it gathers children from every SVG and flattens nested viewports. Sheet attributes apply only to the container, preserving nested attributes.

Serialization finishes before creating a unique temporary sibling. Rename replaces the target; cleanup removes failed temporary output. Parse, data, asset-processing, and write errors preserve an existing sprite. Missing definitions remain warnings and can produce partial successful output.

Concurrent writes to the same target are last-writer-wins. There is no locking or fsync guarantee. See [validation](../development/validation.md) for regression coverage.
