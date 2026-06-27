# Project Working Memory

## App Summary
- `zero-icon-sprite` contains the `@react-zero-ui/icon-sprite` package for React apps.
- The package gives component-style icon DX in development and emits production SVG sprite usage for smaller runtime output.
- It supports Lucide, Tabler, and custom SVG icons from `public/zero-ui-icons/`.
- Consumers import icons from `@react-zero-ui/icon-sprite` and run `npx zero-icons` before app builds to generate `public/icons.svg`.

## Current Focus
- Establish repo context and working memory for future implementation tasks.

## In-Flight Work
- Memory file created after reading the root `README.md` and `icon-sprite/src`.

## Latest Decisions
- Generated icon wrappers should keep the existing dev/prod branch pattern.
- Shared production rendering belongs in `icon-sprite/src/_shared.tsx` via `renderUse`.
- Runtime-safe defaults belong in `icon-sprite/src/config.ts`; Node-only config loading belongs in `icon-sprite/src/loadConfig.ts`.

## Blockers / Risks
- `icon-sprite/src/icons` is mostly generated wrappers; avoid broad manual edits there unless updating the generator or a preserved file.
- Custom icon dev rendering uses `dangerouslySetInnerHTML` after stripping scripts and event handlers; changes there need careful security review.

## Next Actions
- For behavior changes, inspect the relevant script in `icon-sprite/scripts` before editing generated output.
- For runtime icon rendering issues, start with `icon-sprite/src/_shared.tsx`, `icon-sprite/src/icons/CustomIcon.tsx`, and representative wrappers.

## Open Questions
- None currently.

## Resume Fast
- Start with `icon-sprite/README.md` for package behavior, then `icon-sprite/src/_shared.tsx`, `icon-sprite/src/icons/CustomIcon.tsx`, `icon-sprite/src/_custom-dev-icon.tsx`, `icon-sprite/src/config.ts`, and `icon-sprite/src/loadConfig.ts`.

## Updated
- 2026-06-12 13:18 MDT

## Project End Goals (future reference)
- Provide zero-runtime production SVG icons while preserving familiar React component ergonomics during development.
