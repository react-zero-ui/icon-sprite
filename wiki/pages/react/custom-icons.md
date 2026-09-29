---
summary: "Maintain custom SVG loading, keyed state, authored-attribute precedence, and the trusted-input boundary."
paths:
  - packages/icon-sprite/src/react/custom-icon.tsx
  - packages/icon-sprite/src/react/custom-icon-dev.tsx
  - packages/icon-sprite/src/react/icon.tsx
---

# Custom React Icons

## Loading and state

[CustomIcon](../../../packages/icon-sprite/src/react/custom-icon.tsx) activates a lazy browser loader only in `development`. Other environments and pending or failed loads use a sprite reference. The fallback therefore needs an existing sprite. Filename identity and inclusion belong to [sprite output](../build-system/sprite-output.md#symbol-selection).

The loader is keyed by name. [custom-icon-dev.tsx](../../../packages/icon-sprite/src/react/custom-icon-dev.tsx) caches complete SVG markup for first paint, then refreshes each mount with a timestamp and `cache: "no-store"`. Replacing the payload replaces its authored root too, so removed attributes cannot linger in an imperative overlay. Cleanup aborts pending requests. An unchanged mounted name has no filesystem-watch trigger.

## Authored presentation and trust

Instance props live on an outer SVG. Development nests the authored SVG inside it; production references the authored symbol. Fixed paint stays fixed. Authored `inherit` and `currentColor` consume instance styling through ordinary SVG inheritance. Source classes remain on the artwork and caller classes remain on the instance. Application CSS selectors cannot reach classes inside an external sprite.

The instance supplies dimensions; the original viewBox remains on the artwork. Sprite identity uses the custom filename. Keep all other authored root attributes and descendant values intact, including opacity, fill rules, style, and namespaces.

Assets are trusted local SVGs. Extraction removes scripts and event-handler attributes before markup injection; accepting untrusted uploads requires a dedicated sanitization boundary. Review [symbol/definition collisions](../build-system/sprite-output.md#symbol-selection) when adding complex assets.

Custom SVG preservation leaves browser support unchanged. The tested WebKit engine rendered inline gradients but left external symbols using `url(#gradient)` blank, with definitions both local and hoisted. A file-qualified URL rendered correctly in the isolated probe. Keep authored paint URLs intact and verify gradient-dependent custom assets in target browsers. External gradient rendering remains outside the cross-browser parity contract.

[Validation](../development/validation.md#browser-parity-and-limits) records the browser cases and remaining lifecycle gaps.
