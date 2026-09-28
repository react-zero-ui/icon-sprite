---
summary: "Follow the handwritten React interface into shared dimensions, inline adaptation, sprite rendering, and environment-specific behavior."
paths:
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/runtime/icon.tsx
  - packages/icon-sprite/src/runtime/custom-icon.tsx
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/tests/test-runtime.test.js
  - packages/icon-sprite/tests/test-sprite-id-match.test.js
  - packages/icon-sprite/tests/test-runtime-boundary.test.js
---

# Runtime Rendering

[`src/index.ts`](../../../packages/icon-sprite/src/index.ts) is the stable React interface. Generated icons are exposed through a generated barrel; build machinery has a separate package `/build` entrypoint.

## Shared renderer

[`runtime/icon.tsx`](../../../packages/icon-sprite/src/runtime/icon.tsx) owns `IconProps`, `CustomIconProps`, `iconDimensions`, `renderIcon`, and `renderBuiltInIcon`. Generated wrappers own their development component and production symbol identity.

Each dimension resolves as explicit width/height, then `size`, then the shared default. Nullish fallback preserves zero. Development wrappers pass props directly to their generated `DevIcon`, whose outer SVG calls `iconDimensions`. `renderIcon` forwards ordinary SVG props and allows an explicit ARIA override. `renderBuiltInIcon` supplies the validated shared root defaults `fill="none"`, `stroke="currentColor"`, `strokeWidth="2"`, `strokeLinecap="round"`, and `strokeLinejoin="round"` before user props. Production symbols inherit those values from the outer SVG, so explicit props and CSS have the same root ownership model as development without per-icon generated defaults.

[`sprite-contract.ts`](../../../packages/icon-sprite/src/sprite-contract.ts) supplies shared URLs, default size, the built-in presentation contract, and the remaining presentation-risk metadata. Built-ins guarantee root-prop parity for `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin`, and `color`; authored descendant attributes still override inherited root values in both modes. Other SVG presentation props remain outside that guarantee and can produce scanner warnings.

## Environment boundaries

Built-in wrappers branch inline whenever `NODE_ENV` differs from `production`. Each generated wrapper contains its own development SVG implementation derived from the package-owned archive, so neither Lucide nor Tabler React packages participate in consumer rendering. Keep the environment branch visible so bundlers can erase development markup from production output.

`CustomIcon` activates its lazy client loader only in `development`. Other environments use the sprite. Tests that change `NODE_ENV` must account for initialization of that lazy component.

[`test-runtime`](../../../packages/icon-sprite/tests/test-runtime.test.js) covers shared rendering contracts. [`test-sprite-id-match`](../../../packages/icon-sprite/tests/test-sprite-id-match.test.js) renders every mapped public icon against its symbol ID. [`test-runtime-boundary`](../../../packages/icon-sprite/tests/test-runtime-boundary.test.js) follows the complete compiled dependency graph, including lazy imports, to reject Node build dependencies. [Custom loading](custom-icons.md) and [validation limits](../development/validation.md) cover browser-specific concerns.
