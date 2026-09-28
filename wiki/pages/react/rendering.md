---
summary: "Preserve built-in dev/production rendering, compact server code, sizing precedence, and root presentation inheritance."
paths:
  - packages/icon-sprite/src/react/icon.tsx
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-library/src/component-generation.ts
---

# React Icon Rendering

## Environment choice

Each generated named component selects inline `DevIcon` whenever `NODE_ENV` differs from `production`; production calls `renderProdIcon(id, props)`. Keep the branch in the private [component generator](../../../packages/icon-library/src/component-generation.ts) so bundlers can eliminate development geometry. Centralize production defaults and sizing to keep each surviving server-side wrapper small.

Generation drops upstream root `class` plus authored width/height from built-in `DevIcon` source. Provider-specific classes therefore do not leak into application markup; caller `className` comes only from React props. Canonical SVG files remain unchanged.

[react/icon.tsx](../../../packages/icon-sprite/src/react/icon.tsx) creates React elements. `renderProdIcon` applies library defaults, then uses `renderSvgUseElement` for `<svg><use /></svg>`. File creation belongs to [sprite output](../build-system/sprite-output.md). [Custom icons](custom-icons.md) have their own loading lifecycle.

## Instance props

Each dimension resolves as explicit width/height, then `size`, then the package default. Nullish fallback preserves zero. `size` is consumed by sizing logic; other SVG props reach the outer element. Sprite rendering supplies an overrideable `aria-hidden` default.

The [sprite contract](../../../packages/icon-sprite/src/sprite-contract.ts) owns the exact defaults and attribute mappings for `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, and `strokeLinejoin`. Development places them on the inline SVG. Production places them on the outer SVG and makes the symbol inherit. User props follow defaults in both paths, including explicit `undefined` or `null`.

`color` supplies `currentColor`, so text-color CSS classes work with the default stroke. An explicit stroke controls that property independently. Authored descendant paint overrides remain effective in both modes. Additional SVG props accepted by TypeScript carry only the guarantees documented here.

[Validation](../development/validation.md#browser-parity-and-limits) owns browser evidence and coverage limits.
