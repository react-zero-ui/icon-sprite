---
summary: "Protect the npm artifact and compatibility entrypoints, and verify the complete release gate."
paths:
  - packages/icon-sprite/package.json
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/command.ts
  - .oss-release.yaml
  - .github/workflows/oss-release-trusted.yml
---

# Packaging and Publishing

## Installed interface

The [package manifest](../../../packages/icon-sprite/package.json) exposes React at the root and the Node API at `/build`. `generateSprite` aliases `buildSpriteSheet`; `zero-icons` uses `dist/command.js`. The wildcard export permits shipped deep paths, while root and `/build` are the supported application interfaces.

The artifact contains compiled React/build code and declarations, `assets/catalog.json`, `dist/icon-assets.json`, licenses, and the README. Canonical SVG directories, `icon-library/`, scripts, tests, and fixture files remain repository-only. Consumers install no upstream icon packages.

`prepack` builds and runs package tests. Follow [workflow](workflow.md) for artifact preparation and [isolated validation](validation.md#installed-package-validation) after layout, dependency, or CLI changes.

## Release gate

[.oss-release.yaml](../../../.oss-release.yaml) selects the public package directory. The [publication workflow](../../../.github/workflows/oss-release-trusted.yml) verifies the requested version, installs from the root lockfile, runs `check`, and publishes using OIDC permissions.

That job omits isolated/browser integration. Verify the intended commit's complete [validation](validation.md) before an authorized release. Registry trust configuration and publication success require external confirmation; workflow source alone establishes configured intent.
