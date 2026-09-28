# Decision Log

This log preserves reasons for decisions. Linked topic pages own current behavior.

## 2026-09-27: Separate local iteration from consumer validation

Workspace linking can hide hoisted dependencies and files missing from a published artifact. The private fixture supports local iteration, while an isolated tarball installation verifies the consumer boundary. Preserve both checks when simplifying the test setup. Current evidence belongs to [validation](pages/development/validation.md).

## 2026-09-27: Treat strict static-analysis failures as design feedback

Broad lint failures exposed complexity and ambiguous ownership. We chose to refactor violations and keep exceptions specific to concrete semantics or verified tooling limitations. [Code quality](pages/development/code-quality.md) owns enforcement policy.

## 2026-09-27: Give operations ownership of their state

Shared scanner state passed through helper chains and caller-managed SVG assembly required callers to understand internals. Moving state, diagnostics, and cleanup into complete operations reduced that coupling. Later domain organization retained this principle; [architecture](pages/architecture.md) maps the current boundaries.

## 2026-09-27: Preserve published icons across upstream upgrades

Upstream removals and renames previously made existing application icons disappear or fail builds after dependency upgrades. The package therefore owns a cumulative archive and stable public identities. Updates refresh geometry while retaining removed icons. The catalog itself carries compatibility history, avoiding a second historical registry. [Icon library](pages/icon-library.md) owns the update rules.

## 2026-09-28: Keep the `size` prop for upstream compatibility

Lucide and Tabler callers already use `<Icon size={...} />`. Keeping this small convenience lets them switch imports without rewriting sizing. Removing it would break existing usage for little architectural benefit. [React rendering](pages/react/rendering.md) owns dimension precedence.

## 2026-09-28: Put built-in root presentation on each icon instance

Explicit styling on a shared sprite symbol blocked ordinary per-instance overrides. The archives shared root defaults, allowing us to move those defaults to the outer SVG and make symbols inherit. This replaced the stroke-width CSS-variable transport, preserved text-color styling, and kept defaults out of individual production wrappers. [React rendering](pages/react/rendering.md) owns the contract; [icon library](pages/icon-library.md) owns ingestion validation.

## 2026-09-28: Name modules by their owned domain

Repeated renderer renames failed to clarify code that mixed canonical generation, consumer builds, and React elements. We separated `icon-library/`, `src/build/`, and `src/react/` inside one package so components and sprite identities stay versioned together. Names now follow those responsibilities. [Architecture](pages/architecture.md) is the current navigation map.

## 2026-09-28: Give each wiki topic one detailed owner

Successive implementation passes copied the same contracts into overview, architecture, roadmap, and subsystem pages. That amplified review work and allowed descriptions to diverge. Overview now provides startup context, architecture routes to owners, and detailed behavior lives once. Source owns exact implementation values; the roadmap retains deferred work and this log retains reasoning.
