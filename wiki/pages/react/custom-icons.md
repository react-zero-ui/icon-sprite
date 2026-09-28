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

The loader is keyed by name. Switching assets remounts payload state and SVG DOM, preventing attributes from the previous icon carrying over. [custom-icon-dev.tsx](../../../packages/icon-sprite/src/react/custom-icon-dev.tsx) caches the last payload for first paint, then refreshes each mount with a timestamp and `cache: "no-store"`. Cleanup aborts pending requests. An unchanged mounted name has no filesystem-watch trigger.

## Authored presentation and trust

Fetched root attributes take precedence over matching React DOM attributes. Dimensions come from props and classes are merged. Preserve this custom behavior separately from built-in root-prop guarantees; updating the same payload still needs coverage for removed attributes.

Assets are trusted local SVGs. Extraction removes scripts and event-handler attributes before markup injection; accepting untrusted uploads requires a dedicated sanitization boundary. Review [symbol/definition collisions](../build-system/sprite-output.md#symbol-selection) when adding complex assets.

[Validation](../development/validation.md#browser-parity-and-limits) records the current custom-loader testing gap.
