---
summary: "Understand custom SVG identity, keyed loader state, refresh behavior, attribute precedence, fallback, and the trusted-input boundary."
paths:
  - packages/icon-sprite/src/runtime/custom-icon.tsx
  - packages/icon-sprite/src/runtime/custom-icon-dev.tsx
  - packages/icon-sprite/src/runtime/icon.tsx
  - packages/icon-sprite/src/build/icon-assets.ts
  - packages/icon-sprite/tests/test-runtime.test.js
  - scripts/test-integration.ts
---

# Custom Icons

Custom names are exact filename stems. [Asset collection](../build-system/sprite-output.md) includes every SVG directly inside the custom directory, so dynamic names work. Nested discovery and automatic named React exports remain outside this contract.

[`custom-icon.tsx`](../../../packages/icon-sprite/src/runtime/custom-icon.tsx) creates a lazy client component during development and supplies a sprite fallback. The loader is keyed by name: switching assets remounts its payload state and SVG DOM. This prevents the previous asset's markup and attributes from carrying into a differently named icon.

## Loader ownership

[`custom-icon-dev.tsx`](../../../packages/icon-sprite/src/runtime/custom-icon-dev.tsx) owns the payload cache, fetch lifecycle, trusted SVG extraction, and DOM application. The shared renderer supplies dimensions and fallback markup. The module cache provides initial content on remount; every mount still refreshes with a timestamp and `cache: "no-store"`. Cleanup aborts pending requests.

The fetch effect depends on name. Editing an unchanged mounted asset has no dedicated filesystem-watch trigger. Initial and failed loads can reference a sprite that has not yet been generated.

Asset root attributes retain their historical precedence over matching React DOM attributes. Dimensions come from props; asset and caller classes are merged. Updating an existing payload with the same name still needs browser regression coverage for removed attributes and DOM precedence.

## Trust and validation

Local assets are trusted. Extraction strips script elements and event-handler attributes before raw markup injection. Untrusted uploads require a separate sanitizer. Custom IDs and internal SVG definitions share the assembled sprite namespace, so collision review remains necessary.

[`test-runtime`](../../../packages/icon-sprite/tests/test-runtime.test.js) checks name keys and fallback structure. [`test-sprite`](../../../packages/icon-sprite/tests/test-sprite.test.js) covers inclusion and case-sensitive IDs. The [integration harness](../../../scripts/test-integration.ts) validates served symbols and server markup; it leaves client fetches, sanitization, and visual transitions unexecuted.
