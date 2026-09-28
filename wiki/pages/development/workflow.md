---
summary: "Avoid stale builds: local fixture behavior, package compilation order, direct TypeScript execution, and generated-file ownership."
paths:
  - package.json
  - tsconfig.tools.json
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

[scripts/build.ts](../../../packages/icon-sprite/scripts/build.ts) generates component source, recreates `dist`, compiles, then writes packaged data and copies the license. It restores the regenerated CLI's executable bit; omitting that step previously broke workspace bin execution.

## Editing boundaries

`src/` uses `.js` import specifiers for compiled NodeNext output. `icon-library/` and scripts use `.ts` imports for direct Node execution and are checked by [tsconfig.tools.json](../../../tsconfig.tools.json). Preserve these separate execution modes when changing imports.

Canonical assets and handwritten entrypoints stay versioned. Generated `src/icons/`, `dist`, and fixture sprites are disposable. `.gitignore` explicitly retains handwritten `src/build/` despite the generic output exclusion.

Use [icon-library guidance](../icon-library.md) for upstream updates and [validation](validation.md) to select checks.
