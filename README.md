# React Zero Icon Sprite

React icon components during development, a shared SVG sprite in production.

`@react-zero-ui/icon-sprite` supports Lucide, Tabler, and custom SVGs. Consumers import React components and invoke `buildSpriteSheet()` from their build integration. Production icons reference reusable symbols in `public/icons.svg`.

See the [package documentation](packages/icon-sprite/README.md) for installation, props, configuration, and usage.

Agents and maintainers should start with [wiki/AGENTS.md](wiki/AGENTS.md) for project context and routes to architecture, subsystem contracts, debugging, and validation.

## Development

Use the Node 24 LTS version in `.node-version` and npm 11. Run commands from the repository root:

```sh
npm ci
npm run dev
```

`dev` builds the library and starts the Next.js fixture against the local workspace package. Rebuild the library after changing its React implementation or component generator.

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
packages/icon-sprite/       One published npm package
  icon-library/            Canonical catalog, upstream sync/validation, component generation
  assets/                  Committed catalog, cumulative SVG archives, upstream licenses
  src/
    react/                 React icon instances and custom development loading
    build/                 Consumer sprite-sheet creation and packaged-data reading
    icons/                 Generated named React components
    index.ts               Public React entrypoint
    build.ts               Public buildSpriteSheet API and generateSprite compatibility alias
    sprite-contract.ts     Shared URLs and presentation defaults
    config.ts              Public consumer configuration
    command.ts             zero-icons command adapter
  scripts/                 Thin command adapters and package compilation
  tests/                   Domain behavior and compatibility tests
fixtures/next-app/          Private React/Next integration fixture
scripts/test-integration.ts Isolated tarball, server output, and three-browser parity checks
```

The two npm workspaces share one root lockfile and one Biome configuration. The fixture is private and never published. Generated wrappers, local React icon components, compiled output, and fixture sprites are ignored by Git.

## Icon generation

`npm run build` regenerates component wrappers, local development components, and the icon barrel from the committed catalog and SVG archives, then compiles the library. `src/index.ts` remains handwritten. Ordinary builds do not read Lucide or Tabler packages.

`icon-library/component-generation.ts` owns `generateIconComponents()`. It creates source files for the package. The independent `src/build/build-sprite-sheet.ts` owns `buildSpriteSheet()`, which creates a consuming application's `icons.svg`. React rendering selects inline development markup or a production `<use>` reference and performs no file generation.

The fixture invokes the Node API from `next.config.ts` during the production configuration phase. It needs no separate sprite command. Existing applications can continue using the published `zero-icons` prebuild command, which delegates to the same operation.

After intentionally upgrading Lucide or Tabler maintainer dependencies, synchronize both archives:

```sh
npm run sync:icons --workspace @react-zero-ui/icon-sprite
npm run check
```

Synchronization refreshes current SVG bytes and adds new public icons without deleting historical assets or published identities. Review the catalog and asset changes before release.

## Packaging and release

```sh
npm pack --workspace @react-zero-ui/icon-sprite
```

The package's `prepack` builds and tests it. Integration tests check the actual tarball in an isolated temporary project, including production HTML references, served sprite symbols, and development rendering. They use allocated ports and clean up their servers and temporary files.

`.oss-release.yaml` points publishing at `packages/icon-sprite`. The trusted-publishing workflow installs from the root lockfile and runs repository checks before publishing.

## Tooling

Biome owns JS/TS/CSS/JSON formatting, import organization, and linting. Generated code and SVG archives are excluded; handwritten code uses kebab-case filenames. React and consumer-build code compile from `src/`. Node runs `icon-library/` and command scripts with native type stripping; `typecheck:tools` checks them strictly. The library build emits JavaScript and declarations for consumers. Install the Biome editor extension to use the same configuration locally.

Lint warnings fail repository checks and CI. The [code quality policy](wiki/pages/development/code-quality.md) explains nursery rules, import boundaries, and intentional exceptions.

Licensed under [MIT](LICENSE).
