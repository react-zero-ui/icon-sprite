---
summary: "Choose unit, type, fixture, or isolated-package checks and understand what each proves, including browser and platform gaps."
paths:
  - package.json
  - packages/icon-sprite/tests/
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
| Public names, generated files, pack resolution | `test-mapping`, `test-lucide-compat`, `test-tabler-resolution`, and the naming tests in `test-sprite-id-match` |
| Source discovery and configuration | `test-scanner-exclusion` and `test-config` |
| Sprite output, failures, concurrency, executable bin | `test-sprite` |
| Runtime element structure and ARIA forwarding | `test-sprite-id-match` and `test-accessibility-props` |

These files live in [`packages/icon-sprite/tests`](../../../packages/icon-sprite/tests/). Most invoke compiled code. Generation tests write isolated temporary directories, compare manifests, and check that regeneration removes stale generated files while preserving handwritten files.

`npm run build:fixture` exercises the local application's production prebuild and Next build. The fixture deliberately contains presentation props that trigger warnings. Review those warnings against the [rendering contract](../runtime/rendering.md).

## Consumer installation boundary

`npm run test:integration` builds, then runs [`scripts/test-integration.ts`](../../../scripts/test-integration.ts). The harness packs existing output with lifecycle scripts disabled, verifies included/excluded files, copies the fixture to a temporary directory, and installs the tarball there. It excludes the local generated sprite so the temporary app must build its own.

The harness pins direct fixture dependencies to root-lock versions. Their transitive dependencies resolve during the temporary `npm install`; this exercises registry installation and can vary independently of a root `npm ci`.

Production HTTP checks require sprite references to resolve to served symbol IDs. Development HTTP checks require inline SVG paths and verify that `ArrowRight` avoids its production reference. The standalone Lucide comparison route is also requested. Workspace symlinks are explicitly rejected for the installed test package.

Temporary ports and servers belong to `verifyServer`; cleanup handles ordinary success/failure and escalates termination when needed. The harness needs registry access and loopback listeners. Preserve its ownership of temporary files and process groups when extending it.

## Coverage limits

HTTP checks inspect server responses. Browser execution, hydration, custom-icon fetches, SVG visual styling, cache invalidation, and accessibility-tree behavior remain untested by this harness. There is no bundle-size assertion or browser/framework compatibility matrix.

[`check.yml`](../../../.github/workflows/check.yml) configures Ubuntu with the repository runtime pin, runs `check`, then invokes the already-built integration harness directly. Local passing tests and workflow configuration provide different evidence from an observed remote CI run. Consult [publishing](publishing.md) for the separate release gate.
