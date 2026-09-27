---
summary: "Maintain strict Biome rules, deliberate nursery adoption, browser/CLI import boundaries, generated-code exclusions, and warning-free validation."
paths:
  - biome.json
  - package.json
  - .editorconfig
---

# Code Quality

## Enforcement model

[`biome.json`](../../../biome.json) uses the schema bundled with the pinned Biome package. Recommended rules provide the baseline; explicit rules strengthen type safety, promise handling, imports, test discipline, control flow, performance footguns, and complexity. Project, type, and React analysis apply throughout handwritten code. Next and Tailwind domains apply to the fixture.

Nursery rules are selected individually. [Biome treats them as experimental](https://biomejs.dev/linter/#nursery), so upgrades require reviewing diagnostics and verifying behavior before adopting newly available rules. Preserve the independent TypeScript checks: Biome's inference provides complementary evidence.

Root `lint` is read-only and uses `--error-on-warnings`. It gates `check` and CI, including stale suppression warnings. `lint:fix` applies fixes Biome classifies as safe. `lint:fix:unsafe` explicitly enables additional fixes that need review. Formatting follows the shared config; applying a formatter change includes bringing handwritten files into compliance.

Biome assists are part of the repository contract. Imports are organized, package manifests use Biome's package.json ordering, JSX attributes and TypeScript interface members are sorted, CSS properties are normalized, and ordinary JSON keys are sorted in natural order. Package manifests are excluded from generic key sorting so the package.json-specific convention remains authoritative. Source actions can change ordering, so review fixes where runtime semantics depend on insertion order.

## Execution and ownership boundaries

Compiled library source uses `.js` relative import specifiers, with explicit extension mappings for TypeScript and TSX. Maintainer scripts execute directly and use `.ts` specifiers. Keep these policies separate when changing import rules; a default extension fix can otherwise break emitted JavaScript.

Browser runtime modules reject Node built-ins and direct imports of the CLI or configuration loader. CLI source and `config-loader.ts` retain Node access. This checks direct dependencies; review [architecture](../architecture.md) when moving responsibilities or introducing indirect dependencies.

Console warnings and errors remain available throughout the project. CLI entrypoints, maintainer scripts, and tests additionally allow normal output. Debug logging in runtime and fixture code fails lint.

## Exclusions and exceptions

Generated wrappers, declarations, compiled library output, and Next types use regular `!` exclusions. Biome can still resolve them for import and type analysis while leaving their formatting untouched. [Force exclusions](https://biomejs.dev/reference/configuration/#interaction-with-the-scanner) use `!!` for SVG assets, packaged data manifests, public assets, reports, editor state, and wiki audit state. Those files provide no module-analysis input. Keep `dist` resolvable because the fixture and tests consume the built library.

Keep suppression reasons local to verified exceptions. Existing cases include svgstore's CommonJS resolver mismatch, trusted custom SVG markup, and a synthetic JSX test string flagged by the secret heuristic. Investigate a new diagnostic before changing the policy or adding an exception.

## Design judgment

Handwritten barrel files, implicit control-flow blocks, nested ternaries, namespace imports, unchecked assertions, ignored TypeScript errors, focused or skipped tests, repeated regex allocation, and accidental sequential awaits have explicit restrictions. The generated public export barrel remains governed by its generator.

Cognitive complexity is capped at 20 for handwritten functions. Treat violations as design feedback: move cohesive knowledge behind focused helpers or reduce branching before considering an exception. Avoid extracting naming-only wrappers solely to lower the score.

`noAwaitInLoops` is enforced. Parallelize independent work with `Promise.all`; keep a narrow documented suppression only when ordering or retry timing is part of the contract, such as readiness polling. `useTopLevelRegex` is also enforced so repeated code paths reuse compiled expressions. Inline styles remain valid because per-icon CSS variables are part of the rendering contract.

After changes, run [validation](validation.md). Policy probes should include rejected runtime Node/CLI imports, unhandled and misused promises, explicit `any`, focused/skipped Node tests, and fixture logging, together with accepted script logging and both import-extension modes. Verify a warning-only run exits unsuccessfully with the strict command. Remove temporary probes before building the package.
