---
summary: "Resolve configuration once into absolute build inputs; understand precedence, warning fallbacks, URL limits, and module caching."
paths:
  - packages/icon-sprite/src/config.ts
  - packages/icon-sprite/src/sprite-contract.ts
  - packages/icon-sprite/src/build/project.ts
  - packages/icon-sprite/tests/test-config.test.js
---

# Consumer Configuration

[`resolveProject(projectDirectory)`](../../../packages/icon-sprite/src/build/project.ts) owns config discovery, source-root detection, and path interpretation. It returns `SpriteProject`: scanner inputs, custom directory, output file, and warnings. Downstream modules receive resolved paths and never interpret uppercase config settings.

The public `ZeroUIConfig` type, defaults, and pure `parseConfig` validator live in [`config.ts`](../../../packages/icon-sprite/src/config.ts). Keeping the representation together localizes additions to config fields. Runtime URLs originate in [`sprite-contract.ts`](../../../packages/icon-sprite/src/sprite-contract.ts). Changing a consumer's output path leaves runtime URLs unchanged; the application must serve assets at `/icons.svg` and `/zero-ui-icons/`.

## Resolution contract

TypeScript config takes precedence over JavaScript. Each candidate executes only if the previous candidate is absent or invalid. Config modules are trusted Node code; default exports, named exports, CommonJS JavaScript, and relative imports remain supported. Node's module cache applies across repeated calls.

Invalid candidates append warnings and fall back. Unknown keys are ignored. Array overrides replace defaults and are copied per operation. Resolved results share no mutable arrays with other consumers.

Source detection selects the first directory among `src`, `app`, and `pages`; explicit `ROOT_DIR` overrides detection. The final `src` fallback can still fail during scanning if absent. Trusted paths can point outside the application; this API provides no filesystem sandbox.

Warnings return through the build result so each integration owns reporting policy. [Source scanning](source-scanning.md) explains discovery after resolution; [output](sprite-output.md) owns failure preservation. [`test-config`](../../../packages/icon-sprite/tests/test-config.test.js) covers normalization, precedence, fallback, relative imports, and isolation.
