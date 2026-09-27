# Project Working Memory

## Project
- One publishable React library: `packages/icon-sprite`, package name `@react-zero-ui/icon-sprite`.
- One private integration fixture: `fixtures/next-app`, package name `@react-zero-ui/icon-sprite-fixture`.
- Native npm workspaces, one root lockfile, one root Biome configuration. Run commands from the repository root.
- Development renders inline SVG components. Production wrappers render external SVG sprite references. Custom SVG assets live in the consuming app's `public/zero-ui-icons/`.

## Current State
- Repository restructuring, code-generation consolidation, stateless CLI refactoring, and dependency upgrades are implemented locally.
- Node 24.21.0 and npm 11.20.0 are pinned for development. TypeScript 7.0.2 compiles the library and checks the fixture.
- Library package version remains 0.4.2. No commit, release, or publish was performed.

## Ownership
- `src/render-use.tsx`: shared production rendering, dimensions, SVG props, and stroke-width CSS variable.
- `src/custom-icon.tsx` and `src/custom-dev-icon.tsx`: custom icon production wrapper and development loader.
- `src/config.ts`: runtime-safe defaults and configuration type. `src/config-loader.ts`: Node-only consumer config loading.
- `src/cli/generate-sprite.ts`: per-consumer build operation, configuration, asset loading, and atomic sprite output. `src/cli/scan-icons.ts`: Babel source analysis. The package bin uses compiled `dist/cli/index.js`.
- `scripts/icon-catalog.ts`: public component names, sprite IDs, collision rules, and historical Tabler aliases. Shared manifest types live in `src/icon-info.ts`.
- `scripts/generate-icons.ts`: derives wrappers, local Lucide React components, source exports, and CLI manifests.
- `assets/lucide/`: canonical SVG archive. `scripts/collect-lucide-icons.ts` refreshes current assets while retaining historical files.
- Runtime, CLI, maintainer scripts, integration harness, and supported fixture configs use TypeScript. Root `tsconfig.tools.json` strictly checks Node-executed maintainer scripts; the library build compiles the CLI.

Paths above are relative to `packages/icon-sprite`.

## Generated Files
- `src/icons/`, `src/lucide-archive/`, `src/index.ts`, `generated/`, and `dist/` are ignored build output.
- Edit the owning generator or canonical assets. Handwritten files belong outside generated directories.
- The CLI holds scan results in memory and leaves package files and process cwd unchanged. Each output is written to a temporary sibling and atomically renamed.

## Compatibility and Constraints
- All 7,062 original mapped icon names and symbol IDs were verified against the pre-migration map. The current catalog contains 7,293 mapped icons, plus `CustomIcon`.
- Eight renamed Tabler icons retain their historical public imports and sprite IDs through catalog aliases.
- Built-in icon scanning follows runtime references in JS/JSX/TS/TSX. Unused/type-only imports are excluded. All custom SVG files are included intentionally.
- CLI path overrides control generated asset locations. Runtime URLs remain `/icons.svg` and `/zero-ui-icons/`; custom output must be served at those URLs. This pre-existing limitation is documented in the package README.
- Custom development markup is for trusted local SVG assets. Script and event-handler stripping is limited sanitization; review changes to raw SVG injection carefully.
- Babel 8 sets the CLI Node requirement to `^22.18.0 || >=24.11.0`. React's peer requirement remains `>=17`.

## Validation
- `npm ci` succeeded from a clean dependency installation using the root lockfile.
- `npm run check` passed after the TypeScript migration: library/CLI build, Biome without diagnostics, strict maintainer-tool checks, fixture route generation/typecheck, and 43 tests.
- The workspace fixture production build passed.
- `scripts/test-integration.ts` passed package-content checks, isolated tarball installation, production build, served sprite-symbol checks, and development HTTP rendering after the TypeScript migration.
- The build restores executable permissions on `dist/cli/index.js`. The CLI regression test launches the bin directly on POSIX systems.
- All eight original fixture assets match Git's normalized contents; the original SVG working-file line endings were preserved.
- The integration harness uses allocated ports and cleans up its temporary project and servers. It leaves fixture dependencies and manifests unchanged.
- npm audit reported zero vulnerabilities after the dependency upgrade.

## Resume
Read root `AGENTS.md`, then the package README. Use `npm run dev` for the local fixture, `npm run check` for routine validation, and `npm run test:integration` for packaging/CLI/runtime changes. CI and `.oss-release.yaml` use the new package path.

Updated: 2026-09-27.
