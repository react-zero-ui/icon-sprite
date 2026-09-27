---
summary: "Start with the React and Node interfaces; locate the owners of project settings, scanning, packaged catalogs, assets, and SVG output."
paths:
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/src/build.ts
  - packages/icon-sprite/src/build/
  - packages/icon-sprite/src/catalog.ts
  - packages/icon-sprite/src/runtime/
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-sprite/scripts/generate-icons.ts
  - packages/icon-sprite/package.json
---

# Architecture

## Two application interfaces

[`src/index.ts`](../../packages/icon-sprite/src/index.ts) is the handwritten React facade. It exports custom rendering and public types, then exposes the generated icon barrel. Generation replaces `src/icons/index.ts` while preserving this interface.

[`src/build.ts`](../../packages/icon-sprite/src/build.ts) exposes `generateSprite(projectDirectory?)` through the package's `/build` export. It owns sequencing and combines diagnostics. Consumers supply an application root and receive an output file, symbol count, and warnings. The [fixture config](../../fixtures/next-app/next.config.ts) calls it directly. `command.ts` preserves historical prebuild scripts as a reporting adapter.

```text
Maintainer: source catalog → generated components + packaged manifests → npm artifact
Consumer:  resolveProject → scanIcons → collectSymbols → writeSprite
Runtime:   React facade → inline development components / shared production renderer
```

## Knowledge ownership

[Project resolution](build-system/configuration.md) interprets settings once and returns absolute paths plus narrow scanner options. [Source scanning](build-system/source-scanning.md) hides Babel, traversal, and per-operation state. [Asset collection and writing](build-system/sprite-output.md) consume semantic icon usage and SVG symbols; orchestration never reads a manifest or manipulates XML.

[`catalog.ts`](../../packages/icon-sprite/src/catalog.ts) owns both directions of the packaged manifest protocol and resolves upstream asset locations. [Maintainer catalog generation](build-system/icon-catalog.md) owns public naming, historical aliases, and canonical input preservation.

[`sprite-contract.ts`](../../packages/icon-sprite/src/sprite-contract.ts) defines shared URLs, default dimensions, the stroke-width CSS property, and presentation constraints. [Rendering](runtime/rendering.md) hides those details from generated wrappers. [Custom rendering](runtime/custom-icons.md) owns browser loading and payload state.

Runtime imports stay independent of Node build modules. The application owns asset hosting, caching, and dead-code elimination. [Validation](development/validation.md) checks both the local workspace and the actual consumer artifact.
