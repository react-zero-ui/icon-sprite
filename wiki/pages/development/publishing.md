---
summary: "Preserve tarball completeness, CLI execution, root-lock release checks, and the distinction between configured publishing and verified deployment."
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

The public package ships compiled runtime and CLI files, type declarations, catalog/SVG manifests, and its README. `dist/LICENSE` is copied during build. Canonical SVG directories, maintainer scripts, test sources, and fixture files stay outside the tarball.

Lucide consumer assets and development components are self-contained in those generated artifacts. Tabler remains an installed dependency. The compiled CLI reads sibling packaged manifests through module-relative URLs; changing output layout requires coordinated packaging and path validation.

[`package.json`](../../../packages/icon-sprite/package.json) defines the public entrypoints, package file allowlist, and `zero-icons` bin. Its `prepack` builds and runs package tests. Root `npm pack --workspace @react-zero-ui/icon-sprite` exercises that lifecycle. The integration harness deliberately skips lifecycle scripts because its caller has already built; direct harness execution requires current output.

Use [isolated package validation](validation.md) after changing dependencies, output locations, manifests, or bin handling. Workspace development can resolve files and dependencies unavailable in a consumer tarball.

## Release configuration

[`.oss-release.yaml`](../../../.oss-release.yaml) selects GitHub and npm and points npm at `packages/icon-sprite`. The private fixture has no publication role. Other target branches in the reusable publishing workflow do not establish additional products in this repository.

[`oss-release-trusted.yml`](../../../.github/workflows/oss-release-trusted.yml) accepts manual release inputs, checks the requested version against the package, installs from the repository root lockfile, runs `npm run check`, and publishes from the selected package directory. Node/npm selection follows repository pins. The workflow declares OIDC permissions.

The publication job's `check` step omits the isolated integration harness; the normal [check workflow](../../../.github/workflows/check.yml) runs it separately. Verify the intended commit's complete validation before an authorized release.

Registry trusted-publisher configuration, live release state, and deployed hosting are external facts. The files here establish configured intent. Confirm external status at release time; wiki creation never authorizes publishing.
