---
summary: "Diagnose missing icons through import bindings, static-name evaluation, directory exclusions, and scanner limitations."
paths:
  - packages/icon-sprite/src/build/scan-icon-usage.ts
  - packages/icon-sprite/src/sprite-contract.ts
---

# Source Scanning

[scanIconUsage](../../../packages/icon-sprite/src/build/scan-icon-usage.ts) parses application source without executing it or loading consumer Babel configuration. It owns traversal and binding analysis; callers receive sorted names and diagnostics.

## Discovery limits

Imports must match the configured package name. Binding identity preserves named aliases and shadowing; unused named imports and type-only references are excluded. Value namespace imports fail at the declaration with a named-import diagnostic, including unused declarations and destructuring. Type-only namespaces are erased and remain outside runtime discovery.

Discovery reflects source references, including code later removed by bundling. It does not traverse a re-export graph or handle CommonJS requires and dynamic imports. Local barrels work when a scanned file itself imports and references icons.

Directory exclusions match basenames. Realpath tracking prevents cycles while allowing trusted symlinks outside the selected tree.

## Static names and warnings

Legacy generic `Icon` syntax requires a statically evaluable name. A later spread invalidates an earlier name; a later explicit name can restore it. This syntax support creates no generic public React export.

`CustomIcon` names guide diagnostics; [symbol selection](sprite-output.md#symbol-selection) controls inclusion. Ordinary icon `name` props do not discover other icons.

Presentation warnings inspect direct JSX attributes against the [risk list](../../../packages/icon-sprite/src/sprite-contract.ts). They do not inspect values inside `style`, spreads, or wrapper-generated props. Parse failures and unresolved generic names throw with source locations.
