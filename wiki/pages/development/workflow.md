---
summary: "Use the correct build order, rebuild local fixture dependencies, distinguish TypeScript execution modes, and keep generated files disposable."
paths:
  - package.json
  - .node-version
  - .gitignore
  - biome.json
  - tsconfig.tools.json
  - packages/icon-sprite/package.json
  - packages/icon-sprite/tsconfig.json
  - packages/icon-sprite/scripts/build.ts
  - fixtures/next-app/package.json
  - fixtures/next-app/tsconfig.json
---

# Development Workflow

## Root orchestration

The [root manifest](../../../package.json) coordinates the public library and private fixture with one npm lockfile. Use the runtime pin in [`.node-version`](../../../.node-version) and package-manager pin in the manifest. The published package declares its own consumer engine requirement.

`npm ci` installs dependencies. `npm run build` generates and compiles the library. Tests and the fixture import compiled package output, so a fresh checkout needs that build before standalone test or lint commands that resolve generated imports. Root `check`, `test`, and `typecheck` arrange their prerequisites.

`npm run dev` builds once and then starts the fixture against the workspace package. Editing library source requires rebuilding it; this command has no library watch loop. `build:fixture` first builds the library, then the fixture's prebuild generates the sprite before Next builds the application.

## Execution modes

[`build.ts`](../../../packages/icon-sprite/scripts/build.ts) invokes generation, recreates `dist`, runs the compiler, copies the license, and restores the CLI executable bit. Recreating the compiled bin without `chmod` previously caused workspace execution to fail. The direct-bin test protects this contract.

Library TypeScript uses NodeNext and `.js` runtime import specifiers so emitted JavaScript runs in Node. Maintainer scripts execute directly under Node type stripping and use `.ts` runtime imports. [`tsconfig.tools.json`](../../../tsconfig.tools.json) strictly checks these scripts without emitting them. The fixture has a separate bundler-oriented configuration and generates route types before its typecheck.

PostCSS configuration remains an `.mjs` tool entrypoint. Tests are JavaScript using Node's test runner; migrating syntax should preserve the behavior checked against compiled output.

## Ownership during edits

Generated wrappers, local Lucide components, the source barrel, manifests, `dist`, and fixture sprites are ignored output. Canonical archives and handwritten generators stay versioned. [Catalog guidance](../build-system/icon-catalog.md) explains how to refresh upstream assets safely.

[`biome.json`](../../../biome.json) owns formatting and strict handwritten-code rules. The [code quality policy](code-quality.md) explains nursery adoption, import boundaries, generated-file exclusions, fix commands, and documented tool exceptions.

Choose checks through [validation](validation.md). Refer to the [root README](../../../README.md) for command syntax and [publishing](publishing.md) for artifact preparation.
