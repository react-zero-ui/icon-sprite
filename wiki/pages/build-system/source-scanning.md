---
summary: "Trace missing icons through source scanning and import bindings; understand import coverage, dynamic-name handling, and diagnostic limits."
paths:
  - packages/icon-sprite/src/cli/scan-icons.ts
  - packages/icon-sprite/tests/test-scanner-exclusion.test.js
  - packages/icon-sprite/scripts/generate-icons.ts
---

# Source Scanning

[`scanIcons(projectDir, config)`](../../../packages/icon-sprite/src/cli/scan-icons.ts) returns built-in names, statically known custom names, and warnings. It reads source without executing it or loading the consumer's Babel configuration.

## Coverage model

The scanner walks the selected tree and parses JS, JSX, TS, and TSX. Exclusions match directory basenames recursively. Realpath tracking prevents linked-directory cycles; linked source files and directories can be read outside the tree. The scan root is a discovery boundary, with trusted project configuration controlling access.

Discovery starts from imports whose source exactly matches `IMPORT_NAME`. Babel binding references identify actual references to imported values, handling aliases, shadowing, and usage before import declarations. Unused imports and references confined to TypeScript types are excluded.

Static namespace members work in JSX and expressions. Computed dynamic members produce a warning. Source references can still exist in application code that a bundler later removes. Sprite contents reflect static source discovery; final bundle reachability can be narrower.

There is no cross-module dependency-graph traversal. Direct `export { Check } from "..."` declarations, `export *`, CommonJS requires, and dynamic imports have no discovery handler. A local barrel can work when a scanned file itself imports and references the icon. Keep direct package imports visible inside the scan tree when debugging omissions.

## Names and diagnostics

The scanner recognizes legacy generic `Icon` syntax and requires a statically evaluable `name`. A later prop spread invalidates an earlier static name because it can override it. This parser capability does not establish a public generic component: the generated package barrel exports mapped icons and `CustomIcon`.

`CustomIcon` permits dynamic names because [sprite generation](sprite-output.md) includes all custom SVGs. Its static names support missing-file diagnostics. A `name` prop on an ordinary icon never selects additional icons.

Presentation-prop warnings inspect explicit JSX attributes at discovered icon references. Props supplied through spreads, wrappers, or later runtime calls need separate review. A quiet scan therefore establishes only the absence of detected problems.

Parse errors and unresolved generic names throw with source locations. Unsupported dynamic namespace access remains warning-only. See [configuration](configuration.md) before changing traversal to compensate for an incorrect root.

[`test-scanner-exclusion`](../../../packages/icon-sprite/tests/test-scanner-exclusion.test.js) exercises aliases, binding identity, types, namespace members, exclusions, symlinks, config isolation, warnings, and failure locations.
