---
summary: "Avoid stale builds: local fixture behavior, package compilation order, direct TypeScript execution, and generated-file ownership."
paths:
  - package.json
  - tsconfig.node.json
  - packages/icon-library/package.json
  - packages/icon-library/src/
  - packages/icon-sprite/scripts/build.ts
  - packages/icon-sprite/tsconfig.json
  - fixtures/next-app/next.config.ts
  - fixtures/next-app/package.json
  - .gitignore
---

# Development Workflow

Use the [root README](../../../README.md#development) for setup, version pins, and commands. Tests and the fixture import compiled output, so build the package before standalone checks that resolve generated imports.

## Local iteration

`npm run dev` builds the library once, then starts the workspace fixture. Library edits require another build. Next configuration runs the consumer build API during its production phase; Next type generation also loads that phase and can rewrite the ignored sprite.

[scripts/build.ts](../../../packages/icon-sprite/scripts/build.ts) clears `dist`, invokes the private icon-library generator, compiles the product, copies the package license and canonical root README into the package, then restores the CLI executable bit. The generator creates React source plus package-ready catalog/licenses/SVG data before compilation.

## Editing boundaries

`packages/icon-sprite/src/` uses `.js` import specifiers for compiled NodeNext output. `packages/icon-library/src/` and repository scripts execute directly with `.ts` imports and are checked by [tsconfig.node.json](../../../tsconfig.node.json).

Canonical assets under `packages/icon-library/assets/` stay versioned. Generated `packages/icon-sprite/src/icons/`, `packages/icon-sprite/assets/`, `packages/icon-sprite/README.md`, `dist`, and fixture sprites are disposable. `.gitignore` explicitly retains handwritten `src/build/` despite the generic output exclusion.

Use [icon-library guidance](../icon-library.md) for upstream updates and [validation](validation.md) to select checks.
