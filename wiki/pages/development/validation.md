---
summary: "Choose unit, type, fixture, or isolated-package checks and understand what each proves, including browser and platform gaps."
paths:
  - package.json
  - packages/icon-sprite/tests/
  - fixtures/next-app/next.config.ts
  - scripts/test-integration.ts
  - fixtures/next-app/app/
  - fixtures/next-app/package.json
  - .github/workflows/check.yml
---

# Validation

## Choose the proof needed

`npm run check` builds the library, runs Biome, checks maintainer TypeScript, generates/checks fixture types, and runs package tests. The library build already performs its compiler check. Fixture production builds and isolated installs are separate steps.

The read-only Biome step fails on warnings as well as errors. Use [code quality](code-quality.md) for rule choices, targeted exceptions, and policy probes.

| Changed contract | Focused evidence |
| --- | --- |
| Public names, package-owned archives, sync behavior | `test-icon-sync`, `test-mapping`, and the naming tests in `test-sprite-id-match` |
| Source discovery and configuration | `test-scanner-exclusion` and `test-config` |
| Sprite output, failures, concurrency, executable bin | `test-sprite` |
| Runtime element structure and ARIA forwarding | `test-sprite-id-match` and `test-accessibility-props` |
| Built-in dev/production presentation parity | Playwright capture in `test:integration` |
| Public module boundaries and shared rendering | `test-runtime-boundary` and `test-runtime` |
| Committed catalog representation and asset lookup | `test-catalog` |

These files live in [`packages/icon-sprite/tests`](../../../packages/icon-sprite/tests/). Most invoke compiled code. Generation tests write isolated temporary directories and check that regeneration removes stale generated files while preserving handwritten files. Sync tests verify cumulative archive behavior against installed maintainer sources.

`npm run build:fixture` exercises direct API integration in Next configuration and the production application build. Type generation may invoke the same production config phase. The fixture contains supported presentation overrides such as `fill`, `color`, and `strokeWidth`; these should remain warning-free. Risky presentation diagnostics are covered separately by scanner tests.

## Consumer installation boundary

`npm run test:integration` builds, then runs [`scripts/test-integration.ts`](../../../scripts/test-integration.ts). The harness packs existing output with lifecycle scripts disabled, verifies included/excluded files, copies the fixture to a temporary directory, and installs the tarball there. It excludes the local generated sprite so the temporary app must build its own.

The copied Next config imports `generateSprite` from the installed package's `/build` export. The temporary app has no sprite prebuild command, so successful output proves the callable interface works independently of the compatibility adapter. Package tests separately exercise that adapter.

The harness pins direct fixture dependencies to root-lock versions. Their transitive dependencies resolve during the temporary `npm install`; this exercises registry installation and can vary independently of a root `npm ci`.

Production HTTP checks require sprite references to resolve to served symbol IDs and reject inline icon paths on sprite routes. The built Next client chunks are also scanned to ensure Server Component icon implementations do not leak into browser JavaScript. Development HTTP checks require inline SVG paths and verify that `ArrowRight` avoids its production reference. The standalone Lucide comparison route is also requested. Workspace symlinks are explicitly rejected for the installed test package.

The same harness launches headless Chromium with Playwright and renders `/presentation-parity` once against the production server and once against the development server. It verifies the expected inline-versus-`<use>` structure, compares computed outer-SVG values for `color`, `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, and `strokeLinejoin`, then compares exact screenshots for representative defaults and overrides. A visual mismatch writes the production and development PNGs to `test-results/presentation-parity/`. Install the matching local browser once with `npx playwright install chromium`; CI installs Chromium and its system dependencies explicitly.

Temporary ports and servers belong to `verifyServer`; cleanup handles ordinary success/failure and escalates termination when needed. The harness needs registry access and loopback listeners. Preserve its ownership of temporary files and process groups when extending it.

## Coverage limits

Browser coverage now validates built-in presentation inheritance in Chromium. Hydration-specific behavior, custom-icon fetches, cache invalidation, accessibility-tree behavior, Firefox/WebKit rendering, and broader browser/framework compatibility remain untested. Client chunks are checked for icon-code absence on the current Server Component fixture, but there is no byte-size threshold.

[`check.yml`](../../../.github/workflows/check.yml) configures Ubuntu with the repository runtime pin, runs `check`, then invokes the already-built integration harness directly. Local passing tests and workflow configuration provide different evidence from an observed remote CI run. Consult [publishing](publishing.md) for the separate release gate.
