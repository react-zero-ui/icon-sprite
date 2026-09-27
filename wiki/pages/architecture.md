---
summary: "Map the two build stages, runtime boundary, canonical inputs, and owners before making changes across subsystems."
paths:
  - packages/icon-sprite/scripts/build.ts
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/src/cli/
  - packages/icon-sprite/src/render-use.tsx
  - packages/icon-sprite/package.json
---

# Architecture

## Two independent build stages

```text
Maintainer build
  archived Lucide SVGs + installed icon-pack declarations/assets
    → catalog of public names, symbol IDs, and SVG filenames
    → generated React sources + CLI manifests
    → compiled npm package

Consumer prebuild
  application source + consumer config + packaged manifests/assets
    → detected icon references + local custom SVGs
    → public sprite

Application render
  development → local Lucide components / Tabler components / custom loader
  production  → shared SVG renderer → external sprite symbol
```

The catalog covers the library. A consumer sprite covers statically discovered built-in references plus all custom SVGs in its configured directory. Library compilation alone leaves the consumer sprite to its separate prebuild step.

## Knowledge ownership

[Catalog and generation](build-system/icon-catalog.md) owns public naming, collision handling, archive preservation, and generated representations. The shared [manifest type](../../packages/icon-sprite/src/icon-info.ts) connects that stage to consumer generation.

[Configuration](build-system/configuration.md) resolves consumer settings. [Source scanning](build-system/source-scanning.md) returns discovered references and diagnostics. [Sprite output](build-system/sprite-output.md) owns asset loading and replacement of the consumer's output file.

[Rendering](runtime/rendering.md) owns the production SVG contract. [Custom icons](runtime/custom-icons.md) adds the browser-only development loader. Node-only configuration and CLI imports stay outside the public runtime barrel.

The consumer application owns hosting, cache invalidation, and production bundler optimization. Production still passes through a small React wrapper; removal of development code depends on the application's bundler.

## Working across boundaries

Use [development workflow](development/workflow.md) for build order, [validation](development/validation.md) for checks, and [publishing](development/publishing.md) for tarball contents. The [risk map](open-questions-risks.md) routes unresolved behavior to its detailed owner.
