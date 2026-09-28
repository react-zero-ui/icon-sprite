# Wiki Maintenance

Use the `wiki-system` skill and its update workflow. The wiki routes agents from project context to a focused contract and current source.

## Knowledge ownership

Keep mandatory startup context in `pages/project-overview.md` short. `architecture.md` maps domains and shared boundaries. Detailed behavior belongs to the relevant topic page. A short orientation sentence and a link are sufficient elsewhere.

The root README owns setup and command usage; the package README owns consumer instructions. Source files own exact types, defaults, rule lists, and scripts. Wiki pages preserve relationships, subtle invariants, failure semantics, and evidence limits that require synthesis.

Keep historical reasons in `decision-log.md` and deferred work in `pages/roadmap.md`. Link completed roadmap work to its current owner. Keep transient status and test-run results out of durable pages.

## Routing and freshness

Each routable page needs a concise `summary`. Use `paths` only for source changes that could invalidate its explanation. Avoid watching whole asset archives or unrelated tests merely to increase coverage.

Branch directories require an `index.md` with summary front matter. Index bodies are generated. After edits, use the skill's helper to run `wiki clean wiki`, then `wiki audit wiki`. Review flagged pages against source before `wiki audit mark <page> wiki`; use `baseline` only for initially reviewed pages. Never edit `.wiki-system/` state manually.

Check routes for realistic rendering, sync, build, and release tasks. Follow links through to existing source and preserve useful failure/compatibility knowledge when merging pages.

## Repository constraints

`raw/` contains read-only captured evidence. Copy imported evidence there, preserve originals, and leave raw bodies unchanged without approval.

Keep authored pages and `.wiki-system/audit-state.json` Git-visible. Generic `build/` paths are ignored, so this wiki uses `pages/build-system/`; verify new paths with `git check-ignore`.
