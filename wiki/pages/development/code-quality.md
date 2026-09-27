---
summary: "Maintain strict Biome rules, browser/build boundaries, generated-code exclusions, and narrow exceptions that preserve cohesive module contracts."
paths:
  - biome.json
  - package.json
  - .editorconfig
  - packages/icon-sprite/src/index.ts
  - packages/icon-sprite/tests/test-runtime-boundary.test.js
---

# Code Quality

## Enforcement model

[`biome.json`](../../../biome.json) uses the schema bundled with the pinned Biome package. Recommended rules provide the baseline; explicit rules strengthen type safety, promise handling, imports, test discipline, control flow, performance footguns, and complexity. Project, type, and React analysis apply throughout handwritten code. Next and Tailwind domains apply to the fixture.

Nursery rules are selected individually. [Biome treats them as experimental](https://biomejs.dev/linter/#nursery), so upgrades require reviewing diagnostics and verifying behavior before adopting newly available rules. Preserve the independent TypeScript checks: Biome's inference provides complementary evidence.

Root `lint` is read-only and uses `--error-on-warnings`. It gates `check` and CI, including stale suppression warnings. `lint:fix` applies fixes Biome classifies as safe. `lint:fix:unsafe` explicitly enables additional fixes that need review. Formatting follows the shared config; applying a formatter change includes bringing handwritten files into compliance.

Biome assists are part of the repository contract. Imports are organized, package manifests use Biome's package.json ordering, JSX attributes and TypeScript interface members are sorted, CSS properties are normalized, and ordinary JSON keys are sorted in natural order. Package manifests are excluded from generic key sorting so the package.json-specific convention remains authoritative. Source actions can change ordering, so review fixes where runtime semantics depend on insertion order.

## Execution and ownership boundaries

Compiled library source uses `.js` relative import specifiers, with explicit extension mappings for TypeScript and TSX. Maintainer scripts execute directly and use `.ts` specifiers. Keep these policies separate when changing import rules; a default extension fix can otherwise break emitted JavaScript.

`noNodejsModules` applies to `src/runtime/`, the React entrypoint, pure configuration, and the shared sprite contract. Node build modules, the catalog reader, and the compatibility command retain filesystem access. The associated import restrictions reject build/catalog/command dependencies from runtime code. [`test-runtime-boundary`](../../../packages/icon-sprite/tests/test-runtime-boundary.test.js) also follows the complete compiled React graph, including lazy imports, to catch indirect violations.

Console warnings and errors remain available throughout the project. `command.ts`, maintainer scripts, and tests additionally allow normal output. Debug logging in runtime and fixture code fails lint. The callable build operation returns diagnostics so integrations own reporting.

## Exclusions and exceptions

Generated wrappers, declarations, compiled library output, and Next types use regular `!` exclusions. Biome can still resolve them for import and type analysis while leaving their formatting untouched. [Force exclusions](https://biomejs.dev/reference/configuration/#interaction-with-the-scanner) use `!!` for SVG assets, packaged data manifests, public assets, reports, editor state, and wiki audit state. Those files provide no module-analysis input. Keep `dist` resolvable because the fixture and tests consume the built library.

The handwritten `src/index.ts` is checked. Its exact-file override permits a public facade and the generated icon export barrel. Other handwritten files retain the barrel restrictions. This exception gives maintainers one visible supported React interface without duplicating generated names.

Keep suppression reasons local to verified exceptions. Current examples include svgstore's CommonJS resolver mismatch, React's named Suspense resolution limitation, trusted custom SVG markup, cohesive import-binding analysis, and sequential config precedence or readiness polling. Investigate a diagnostic before changing policy or adding an exception.

## Design judgment

Internal barrel files, implicit control-flow blocks, nested ternaries, namespace imports, unchecked assertions, ignored TypeScript errors, focused or skipped tests, repeated regex allocation, and accidental sequential awaits have explicit restrictions. The generated icon barrel remains governed by its generator.

Cognitive complexity is capped at 21 for handwritten functions. A documented scanner exception retains one complete import-binding operation at 23. Treat violations as design feedback: move cohesive knowledge behind focused interfaces or reduce branching before considering an exception. Avoid extracting naming-only wrappers solely to lower a score.

`noAwaitInLoops` is enforced. Parallelize independent work with `Promise.all`; keep a narrow documented suppression only when ordering or retry timing is part of the contract, such as readiness polling. `useTopLevelRegex` is also enforced so repeated code paths reuse compiled expressions. Inline styles remain valid because per-icon CSS variables are part of the rendering contract.

After changes, run [validation](validation.md). Policy probes should include rejected runtime Node/build imports, unhandled and misused promises, explicit `any`, focused/skipped Node tests, and fixture logging, together with accepted build-module Node access and both import-extension modes. Verify a warning-only run exits unsuccessfully with the strict command. Remove temporary probes before building the package.
