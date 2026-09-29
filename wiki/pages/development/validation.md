---
summary: "Select checks and interpret their evidence: unit contracts, isolated installation, three-browser parity, and remaining gaps."
paths:
  - package.json
  - packages/icon-library/tests/
  - packages/icon-sprite/tests/
  - scripts/test-integration.ts
  - fixtures/next-app/app/presentation-parity/page.tsx
  - fixtures/next-app/next.config.ts
  - .github/workflows/check.yml
---

# Validation

## Select checks

`npm run check` prepares compiled output, runs lint and TypeScript checks, and executes package tests. `build:fixture` additionally builds the local Next application. Packaging, React, dependency, and CLI changes require `test:integration`.

Focused tests follow ownership: canonical generation/sync tests live in [packages/icon-library/tests](../../../packages/icon-library/tests/); product tests live in [packages/icon-sprite/tests](../../../packages/icon-sprite/tests/).

| Contract | Tests |
| --- | --- |
| Canonical upgrades and generated exports | `test-upstream-sync`, `test-component-generation` |
| Input discovery and config | `test-icon-usage`, `test-build-config` |
| Installed lookup, sprite output, and CLI | `test-packaged-icons`, `test-sprite-sheet` |
| React props, identities, and import boundaries | `test-react`, `test-sprite-id-match`, `test-react-boundary`, `test-accessibility-props` |

`icon-props.types.ts` is checked by the Node TypeScript configuration against emitted declarations. It accepts the explicit instance API and rejects upstream conveniences and geometry/children props. Sync regressions check that failures in either pack preserve every canonical file. Sprite tests exercise duplicate IDs and namespace imports through both the API and CLI.

## Installed-package validation

[test-integration.ts](../../../scripts/test-integration.ts) packs existing output with lifecycle scripts disabled, checks the artifact, and installs it into a temporary copy of the fixture. It rejects workspace symlinks and omits the local sprite so the installed `/build` API must create one. Direct harness execution requires a current build.

Direct fixture dependencies follow root-lock versions; transitive versions resolve during installation and can vary from `npm ci`. The harness needs registry access and loopback listeners. Preserve its ownership of temporary servers, process groups, and cleanup when extending it.

HTTP checks validate production references against served symbol IDs and reject inline paths on sprite routes. Development checks require inline geometry. Client chunks are scanned for leaked icon implementations on the Server Component fixture.

## Browser parity and limits

Install the matching Playwright engines with `npx playwright install chromium firefox webkit`. Each engine renders [presentation-parity](../../../fixtures/next-app/app/presentation-parity/page.tsx) against production and development servers. Checks compare structure, ARIA defaults/overrides, computed outer-SVG styles, and exact screenshots. Cases include both packs and custom fixed paint, explicit inheritance, currentColor, and nested viewports. Custom captures wait for the fetched SVG to replace its sprite fallback. Comparisons stay within each engine.

Failures write paired PNGs under `test-results/presentation-parity/<browser>/`. Keep screenshots serialized on their shared page for deterministic capture.

Coverage includes external `<use>` visual behavior in Chromium, Firefox, and WebKit plus initial custom payload loading. The nested-viewport fixture uses solid paint; unit tests separately verify preservation of local SVG definitions. External gradients have a known [custom rendering limit](../react/custom-icons.md#authored-presentation-and-trust) in the tested WebKit engine. Arbitrary SVGs/props, every browser version, cache refresh/remount behavior, and accessibility-tree semantics need separate evidence. Client-code absence has a regression check; byte-size thresholds do not.

The [check workflow](../../../.github/workflows/check.yml) runs `check`, installs engines with system dependencies, then runs the harness. Release-specific requirements belong to [publishing](publishing.md#release-gate).
