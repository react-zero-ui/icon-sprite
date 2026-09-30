---
summary: "Protect the npm artifact and compatibility entrypoints, and verify the complete release gate."
paths:
  - README.md
  - packages/icon-library/package.json
  - packages/icon-sprite/package.json
  - packages/icon-sprite/scripts/build.ts
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/command.ts
  - .oss-release.yaml
  - .github/workflows/oss-release-trusted.yml
---

# Packaging and Publishing

## Installed interface

The [package manifest](../../../packages/icon-sprite/package.json) exposes React at the root and the Node API at `/build`. `generateSprite` aliases `buildSpriteSheet`; `zero-icons` uses `dist/command.js`. The wildcard export permits shipped deep paths, while root and `/build` are the supported application interfaces.

The artifact contains compiled React/build code and declarations, generated `assets/catalog.json`, generated licenses, `dist/icon-assets.json`, and a package README copied from the root README during build. Root README is the single maintained source for GitHub and npm copy. Canonical icon source stays in the private sibling workspace and cannot enter the package tarball. Consumers install no upstream icon packages.

`prepack` runs from the monorepo and builds generated package inputs through the private workspace before package tests. The published package has no dependency on `@react-zero-ui/icon-library`. Follow [workflow](workflow.md) for artifact preparation and [isolated validation](validation.md#installed-package-validation) after layout, dependency, or CLI changes.

## Release gate

[.oss-release.yaml](../../../.oss-release.yaml) selects the public package directory. The [publication workflow](../../../.github/workflows/oss-release-trusted.yml) verifies the requested version, installs from the root lockfile, runs `check`, and publishes using OIDC permissions.

That job omits isolated/browser integration. Verify the intended commit's complete [validation](validation.md) before an authorized release. Registry trust configuration and publication success require external confirmation; workflow source alone establishes configured intent.
