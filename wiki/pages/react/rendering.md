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

`IconProps` owns the explicit instance API in the renderer: dimensions, supported paint, events, accessibility, data attributes, and ordinary instance styling. Geometry, children, and upstream-specific conveniences stay outside that type. Compile-time assertions in `tests/icon-props.types.ts` protect this boundary.

Each dimension resolves as explicit width/height, then `size`, then the package default. Nullish fallback preserves zero. Every rendering mode supplies `aria-hidden="true"`; caller props override it. Adding a role or label alone preserves the decorative default.

The [sprite contract](../../../packages/icon-sprite/src/sprite-contract.ts) owns the exact defaults and attribute mappings for `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, and `strokeLinejoin`. Development places them on the inline SVG. Production places them on the outer SVG and makes the symbol inherit. User props follow defaults in both paths, including explicit `undefined` or `null`.

`color` supplies `currentColor`, so text-color CSS classes work with the default stroke. An explicit stroke controls that property independently. Authored descendant paint overrides remain effective in both modes. Ref behavior and the React peer range remain unchanged; the package does not emulate upstream-specific React APIs.

[Validation](../development/validation.md#browser-parity-and-limits) owns browser evidence and coverage limits.
