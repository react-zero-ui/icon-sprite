---
summary: "Change icon props or rendering while preserving environment branches, dimensions, accessibility, and the shared stroke-width contract."
paths:
  - packages/icon-sprite/src/render-use.tsx
  - packages/icon-sprite/src/custom-icon.tsx
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/src/cli/generate-sprite.ts
  - packages/icon-sprite/tests/test-accessibility-props.test.js
  - packages/icon-sprite/tests/test-sprite-id-match.test.js
---

# Runtime Rendering

## Environment branches

The [`wrapper` template](../../../packages/icon-sprite/scripts/generate-icons.ts) uses inline components whenever `NODE_ENV` differs from `production`. Lucide uses generated local components derived from the SVG archive; Tabler uses its React dependency. The local Lucide implementation retains SVG geometry and forwarded props, with behavior defined by this generator.

Production calls [`renderUse`](../../../packages/icon-sprite/src/render-use.tsx) with the catalog's symbol ID and runtime sprite URL. This is a React wrapper around `<svg><use>`. The application bundler owns replacing `NODE_ENV` and removing development imports. Merely generating a sprite leaves that optimization to the application build.

`CustomIcon` activates its lazy client renderer only for `development`; other environments use the sprite directly. A test environment therefore takes different branches for built-in and custom icons. Tests changing `NODE_ENV` after module import must account for the custom module's initialization-time lazy-component choice.

## Instance contract

Each dimension resolves independently as explicit dimension, then `size`, then `24`. Nullish fallback preserves zero. General SVG props reach the outer element. Default `aria-hidden="true"` precedes caller props, allowing explicit accessibility overrides. A meaningful label needs the corresponding override as well as its role or accessible name.

`strokeWidth` becomes `--icon-stroke-width` on the outer SVG. The [sprite builder](../build-system/sprite-output.md) inserts the matching variable into SVG content. Caller `style` entries take precedence in that merge. Changes to either half require checking the other.

Presentation attributes stored inside the symbol can behave differently from inline props. Color should flow through CSS `color` when the asset uses `currentColor`. Types accepting an SVG prop establish API shape; browser visual equivalence needs validation. The [scanner](../build-system/source-scanning.md) warns about some explicit risky props.

## Debug and test route

For missing production icons, inspect `href`, asset response, and symbol ID before changing markup. A stale or misplaced sprite belongs to [consumer output](../build-system/sprite-output.md). Changes intended for every icon belong in the shared renderer or wrapper template.

[`test-sprite-id-match`](../../../packages/icon-sprite/tests/test-sprite-id-match.test.js) checks compiled element structure, environment branches, geometry, dimensions, and forwarded props. [`test-accessibility-props`](../../../packages/icon-sprite/tests/test-accessibility-props.test.js) checks default and overridden ARIA behavior. Browser styling, assistive-technology behavior, hydration, and bundle size remain separate [validation concerns](../development/validation.md).
