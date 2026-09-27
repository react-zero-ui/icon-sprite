# Decision Log

## 2026-09-27: Separate local iteration from consumer validation

The repository refactor established one public library and a private Next.js integration fixture. Workspace linking supports local iteration; a second installation context tests the actual tarball outside the workspace. Keeping both prevents hoisted dependencies, archived assets, and unpublished source files from becoming hidden consumer requirements.

This reasoning matters when simplifying tests or changing repository layout: local fixture success covers a different boundary from isolated installation. The implementation is in [the integration harness](../scripts/test-integration.ts); current test contracts live in [validation](pages/development/validation.md). The refactor was committed as `4c7219d9`.
## 2026-09-27 — Treat strict static-analysis failures as design feedback

Biome policy was expanded beyond recommended defaults to enforce structural rules, selected nursery checks, source organization, cognitive-complexity limits, import boundaries, promise discipline, and deterministic project-file ordering. Existing violations were refactored instead of weakening rules because the repository uses lint failures to expose complexity and ambiguous ownership. Exceptions remain narrow and require a concrete semantic or tooling reason.

## 2026-09-27: Make operation ownership visible

The broad refactor replaced shared scanner state passed through helper chains and caller-managed SVG assembly with operation-oriented modules. The handwritten React facade and callable `/build` entrypoint now identify the supported application interfaces. Project resolution owns paths; scanning owns Babel and traversal; the catalog owns manifest reading and writing; asset collection owns selection; the writer owns XML and atomic output. Shared sprite constants keep generation and rendering aligned.

The Next fixture calls the build operation directly. The historical command remains a compatibility adapter because existing documented package scripts use it. New integration work starts at the callable API. Narrow lint exceptions permit the React facade and cohesive scanner logic while preserving runtime/build dependency checks.

