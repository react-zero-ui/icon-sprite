---
summary: "Debug custom SVG loading, cache refresh, fallback, and attribute precedence; preserve the trusted-local-asset boundary."
paths:
  - packages/icon-sprite/src/custom-icon.tsx
  - packages/icon-sprite/src/custom-dev-icon.tsx
  - packages/icon-sprite/src/config.ts
  - packages/icon-sprite/src/cli/generate-sprite.ts
  - packages/icon-sprite/tests/test-sprite.test.js
  - scripts/test-integration.ts
---

# Custom Icons

## One asset, two delivery paths

`CustomIcon` uses a filename stem as its exact symbol name. The [builder](../build-system/sprite-output.md) includes every SVG directly inside the custom asset directory, so dynamic names can work in production. Nested directory discovery and automatic public named exports are outside that contract.

[`custom-icon.tsx`](../../../packages/icon-sprite/src/custom-icon.tsx) uses a lazy client component inside `Suspense` during development. Its fallback is already a sprite reference. An initial render, pending fetch, or failed fetch can therefore depend on a sprite that has not yet been generated. Brief missing content in development can originate in this lifecycle.

## Browser loader lifecycle

[`DevCustomIcon`](../../../packages/icon-sprite/src/custom-dev-icon.tsx) fetches the encoded filename from the fixed runtime directory, with a timestamp and `cache: "no-store"`. Each mount or name change starts a request; cleanup aborts it. The module-level payload cache supplies an initial value for later mounts and does not suppress that refresh request.

The fetch effect depends on `name`. Editing a file while the same mounted name remains active has no dedicated filesystem-watch trigger here. Changing names can leave the previous payload visible until the next response. Verify those transitions in a browser before changing cache policy.

`extractSVGContent` separates root attributes from inner markup. The component supplies dimensions from props, merges caller and asset classes, and applies remaining root asset attributes through a layout effect. Asset attributes can overwrite corresponding DOM attributes already supplied by React. This precedence matters for `viewBox`, styling, and accessibility. Removed attributes and payload changes need DOM-level regression coverage.

## Trust boundary

Assets are trusted repository files. Extraction removes script elements and event-handler attributes before injecting markup with `dangerouslySetInnerHTML`. That filtering is intentionally limited; accepting uploaded or remote untrusted SVGs would require a broader sanitization contract. Production assembly has a separate SVG-root check and no equivalent complete sanitization stage.

Custom IDs share a sprite namespace with built-in IDs. Assets with internal definitions also share a document after assembly. Name and definition collisions require review; current tests cover ordinary separate assets.

## Source and verification route

[Configuration](../build-system/configuration.md) explains the fixed development URL and CLI overrides. [`test-sprite`](../../../packages/icon-sprite/tests/test-sprite.test.js) covers filename case, inclusion of unused assets, dynamic-name support, and file symlinks. The [integration harness](../../../scripts/test-integration.ts) checks served production symbols. Its HTTP requests leave client-side fetches, sanitization, and visual transitions unexecuted.
