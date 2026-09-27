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

[`runtime/icon.tsx`](../../../packages/icon-sprite/src/runtime/icon.tsx) owns `IconProps`, `CustomIconProps`, `iconDimensions`, `renderInline`, and `renderIcon`. Generated wrappers know their symbol identity and development component. They delegate dimensions, prop adaptation, URL construction, and production markup to this module.

Each dimension resolves as explicit width/height, then `size`, then the shared default. Nullish fallback preserves zero. `renderInline` keeps absent dimensions optional for upstream components. `renderIcon` forwards SVG props, allows an explicit ARIA override, and transports `strokeWidth` through the shared CSS property. Caller style entries take precedence.

[`sprite-contract.ts`](../../../packages/icon-sprite/src/sprite-contract.ts) supplies URLs, size, and the stroke-width property consumed by both renderer and writer. Presentation values fixed inside symbols may differ from inline SVG behavior; accepting a prop in TypeScript establishes its shape, while visual equivalence needs browser evidence.

## Environment boundaries

Built-in wrappers branch inline whenever `NODE_ENV` differs from `production`. Keep that branch visible in the generator so bundlers can remove development imports. Lucide uses local generated components; Tabler uses its React dependency.

`CustomIcon` activates its lazy client loader only in `development`. Other environments use the sprite. Tests that change `NODE_ENV` must account for initialization of that lazy component.

[`test-runtime`](../../../packages/icon-sprite/tests/test-runtime.test.js) covers shared rendering contracts. [`test-sprite-id-match`](../../../packages/icon-sprite/tests/test-sprite-id-match.test.js) renders every mapped public icon against its symbol ID. [`test-runtime-boundary`](../../../packages/icon-sprite/tests/test-runtime-boundary.test.js) follows the complete compiled dependency graph, including lazy imports, to reject Node build dependencies. [Custom loading](custom-icons.md) and [validation limits](../development/validation.md) cover browser-specific concerns.
