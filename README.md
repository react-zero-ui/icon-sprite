# React Zero Icon Sprite

React icon components during development, a shared SVG sprite in production.

`@react-zero-ui/icon-sprite` supports Lucide, Tabler, and custom SVGs. Consumers import React components and invoke `generateSprite()` from their build integration. Production icons reference reusable symbols in `public/icons.svg`.

See the [package documentation](packages/icon-sprite/README.md) for installation, props, configuration, and usage.

Agents and maintainers should start with [wiki/AGENTS.md](wiki/AGENTS.md) for project context and routes to architecture, subsystem contracts, debugging, and validation.

## Development

Use the Node 24 LTS version in `.node-version` and npm 11. Run commands from the repository root:

```sh
npm ci
npm run dev
```

`dev` builds the library and starts the Next.js fixture against the local workspace package. Rebuild the library after changing its runtime or generator.

```sh
npm run check             # Build, Biome, workspace types, and unit tests
npm run test:integration  # Install the tarball in a temporary app and test dev/prod
npm run build:fixture     # Build the local fixture for manual inspection
npm run lint:fix          # Apply fixes classified safe by Biome
npm run lint:fix:unsafe   # Explicitly enable additional fixes; review the diff
npm run format
```

## Repository

```text
packages/icon-sprite/       Publishable library
  assets/lucide/           Canonical SVG archive, including historical icons
  src/                    React rendering and configuration
    index.ts              Handwritten React public interface
    build.ts              Node build API: generateSprite(projectDirectory?)
    runtime/              SVG rendering and custom development loading
    build/                Project resolution, source scanning, assets, sprite writing
    catalog.ts            Packaged catalog storage and asset resolution
    sprite-contract.ts    Shared URLs, dimensions, and stroke-width transport
    command.ts            Compatibility adapter for zero-icons
  scripts/                Maintainer code generation and package build
  tests/                  Behavior and compatibility tests
fixtures/next-app/         Private integration fixture and comparison pages
scripts/test-integration.ts  Isolated package installation and server smoke tests
```

The two npm workspaces share one root lockfile and one Biome configuration. The fixture is private and never published. Generated wrappers, archived React components, manifests, compiled output, and fixture sprites are ignored by Git.

## Icon generation

`npm run build` regenerates component wrappers, local Lucide components, the icon barrel, and packaged manifests, then compiles the library. `src/index.ts` remains handwritten. Component naming and sprite IDs belong to `scripts/icon-catalog.ts`; `src/catalog.ts` owns writing and reading the packaged representation.

The fixture invokes the Node API from `next.config.ts` during the production configuration phase. It needs no separate sprite command. Existing applications can continue using the published `zero-icons` prebuild command, which delegates to the same operation.

To refresh Lucide assets after upgrading its packages:

```sh
npm run collect:lucide --workspace @react-zero-ui/icon-sprite
npm run check
```

The collector preserves historical SVG filenames. Review asset changes with the dependency update.

## Packaging and release

```sh
npm pack --workspace @react-zero-ui/icon-sprite
```

The package's `prepack` builds and tests it. Integration tests check the actual tarball in an isolated temporary project, including production HTML references, served sprite symbols, and development rendering. They use allocated ports and clean up their servers and temporary files.

`.oss-release.yaml` points publishing at `packages/icon-sprite`. The trusted-publishing workflow installs from the root lockfile and runs repository checks before publishing.

## Tooling

Biome owns JS/TS/CSS/JSON formatting, import organization, and linting. Generated code and SVG archives are excluded; handwritten code uses kebab-case filenames. The runtime, build API, maintainer scripts, and integration harness are TypeScript. Node runs maintainer scripts with native type stripping; `typecheck:tools` checks them strictly. The library build emits JavaScript and declarations for consumers. Install the Biome editor extension to use the same configuration locally.

Lint warnings fail repository checks and CI. The [code quality policy](wiki/pages/development/code-quality.md) explains nursery rules, import boundaries, and intentional exceptions.

Licensed under [MIT](LICENSE).
