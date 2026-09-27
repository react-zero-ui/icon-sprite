# Repository guide

This repository has one public package, `packages/icon-sprite`, and one private integration fixture, `fixtures/next-app`. Use npm from the root. Preserve the public icon imports, default URLs, sprite IDs, and development/production branch behavior.

## Route changes to their owners

- Runtime SVG rendering: `packages/icon-sprite/src/render-use.tsx`.
- Custom icons: `src/custom-icon.tsx` and `src/custom-dev-icon.tsx` inside the package. The development renderer handles trusted local SVG markup; review raw markup changes carefully.
- Runtime defaults and configuration types: `src/config.ts`. Node-only config loading: `src/config-loader.ts`.
- Consumer builds: `src/cli/generate-sprite.ts` owns configuration, asset loading, and atomic output. `src/cli/scan-icons.ts` owns source analysis. These operations must leave package files and process cwd unchanged. The package bin runs compiled `dist/cli/index.js`.
- Public icon names and IDs: `scripts/icon-catalog.ts`. `scripts/generate-icons.ts` derives wrappers, exports, and manifests from that catalog. `src/icon-info.ts` is the shared manifest type. `assets/lucide` preserves historical SVGs.

Generated `src/icons`, `src/lucide-archive`, `src/index.ts`, `generated`, and `dist` are disposable build output. Edit their generator or canonical inputs. Keep handwritten files outside generated directories.

Prefer cohesive modules with small contracts. Keep each naming rule, path rule, and representation with one owner. Avoid extra packages, pass-through layers, or task runners without a demonstrated shared responsibility.

## Validation

Use `npm run check` for build, lint, tooling and fixture types, and unit tests. Run `npm run test:integration` for changes to packaging, dependencies, CLI output, or runtime rendering. The TypeScript integration harness installs the package tarball outside the workspace and cleans up after itself. `npm run dev` starts the local fixture after building the library.

Biome has strict rules for handwritten code. Use targeted explanations for genuine tool limitations; keep generated files excluded. Keep one root lockfile, preserve local assets and credentials, and update package paths in `.oss-release.yaml` and CI when restructuring.
