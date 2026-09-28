---
summary: "Preserve React/build entrypoints, tarball completeness, the compatibility command, root-lock release checks, and publication verification."
paths:
  - packages/icon-sprite/package.json
  - packages/icon-sprite/scripts/build.ts
  - scripts/test-integration.ts
  - .oss-release.yaml
  - .github/workflows/oss-release-trusted.yml
  - .github/workflows/check.yml
---

# Packaging and Publishing

## Artifact boundary

The public package ships compiled runtime/build modules, the compatibility command, declarations, `assets/catalog.json`, the derived `dist/icon-assets.json` SVG bundle, upstream license texts, and its README. `dist/LICENSE` is copied during build. Raw cumulative SVG archives, maintainer scripts, tests, and fixture files stay outside the tarball.

Lucide and Tabler are maintainer-only dev dependencies. Consumer installs resolve both development components and production sprites from data derived during package build from committed archives. The catalog reader locates packaged catalog/bundle files relative to its module; changing asset layout requires coordinated packaging validation.

The export map identifies the React root and `/build` Node API with their declarations. A file wildcard keeps deep-file access compatible where files remain shipped; application integrations should use the supported entrypoints. `zero-icons` targets `dist/command.js` and delegates to the build API.

[`package.json`](../../../packages/icon-sprite/package.json) defines the public entrypoints, package file allowlist, and `zero-icons` bin. Its `prepack` builds and runs package tests. Root `npm pack --workspace @react-zero-ui/icon-sprite` exercises that lifecycle. The integration harness deliberately skips lifecycle scripts because its caller has already built; direct harness execution requires current output.

Use [isolated package validation](validation.md) after changing dependencies, asset layout, output locations, or bin handling. Workspace development can resolve files and dependencies unavailable in a consumer tarball.

## Release configuration

[`.oss-release.yaml`](../../../.oss-release.yaml) selects GitHub and npm and points npm at `packages/icon-sprite`. The private fixture has no publication role. Other target branches in the reusable publishing workflow do not establish additional products in this repository.

[`oss-release-trusted.yml`](../../../.github/workflows/oss-release-trusted.yml) accepts manual release inputs, checks the requested version against the package, installs from the repository root lockfile, runs `npm run check`, and publishes from the selected package directory. Node/npm selection follows repository pins. The workflow declares OIDC permissions.

The publication job's `check` step omits the isolated integration harness; the normal [check workflow](../../../.github/workflows/check.yml) runs it separately. Verify the intended commit's complete validation before an authorized release.

Registry trusted-publisher configuration, live release state, and deployed hosting are external facts. The files here establish configured intent. Confirm external status at release time; wiki creation never authorizes publishing.
