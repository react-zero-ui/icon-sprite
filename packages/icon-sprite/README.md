# @react-zero-ui/icon-sprite

Use Lucide, Tabler, and custom SVG icons through React components. Development renders inline SVGs; production renders references to a shared sprite containing discovered built-in icons and custom SVG assets.

## Install and render

```sh
npm install @react-zero-ui/icon-sprite
```

React 17 or newer is a peer dependency. Build integration requires Node.js 22.18+ on the 22.x line, or Node.js 24.11+.
Consumers do not install Lucide or Tabler packages. Published icon data is derived from this repository's reviewed catalog and cumulative SVG archives.

```tsx
import { ArrowRight, IconBrandGithub, CustomIcon } from "@react-zero-ui/icon-sprite"

<ArrowRight size={24} className="text-gray-600" />
<IconBrandGithub width={32} height={32} />
<CustomIcon name="company-logo" size={40} />
```

Place `company-logo.svg` in `public/zero-ui-icons/` for the custom example. The root entrypoint also exports the `IconProps`, `CustomIconProps`, and `ZeroUIConfig` types.

## Production build integration

Import the Node build API from your build tool or application configuration:

```ts
import { buildSpriteSheet } from "@react-zero-ui/icon-sprite/build"

const result = await buildSpriteSheet() // Defaults to the application's working directory.
for (const warning of result.warnings) {
  console.warn(warning)
}
```

`buildSpriteSheet(projectDirectory?)` returns `{ outputFile, iconCount, warnings }`. It handles config discovery, source analysis, package-owned asset resolution, and atomic writing. Callers decide how to report warnings. Parse, catalog, asset, and write failures reject the operation and preserve an existing sprite. Missing definitions produce warnings and require review before deployment.

Existing integrations may continue importing `generateSprite`; it is an alias of `buildSpriteSheet`.

For Next.js, integrate directly in `next.config.ts`:

```ts
import { buildSpriteSheet } from "@react-zero-ui/icon-sprite/build"
import type { NextConfig } from "next"
import { PHASE_PRODUCTION_BUILD } from "next/constants.js"

export default async function configureNext(phase: string): Promise<NextConfig> {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const { warnings } = await buildSpriteSheet()
    for (const warning of warnings) {
      console.warn(warning)
    }
  }
  return {}
}
```

The repository fixture uses this integration. Next's type-generation command also loads production configuration and can regenerate the sprite. Other build tools can invoke the same Node operation before bundling.

Existing package scripts using `"prebuild": "zero-icons"` remain supported. The command is a compatibility adapter over the build API. Keep build imports in Node configuration; React components belong to the root entrypoint.

The application serves the generated `public/icons.svg` at `/icons.svg` and owns production caching and invalidation. An icon renders approximately:

```html
<svg aria-hidden="true" width="24" height="24">
  <use href="/icons.svg#arrow-right"></use>
</svg>
```

Production retains a small React wrapper. Bundlers that replace `process.env.NODE_ENV` and remove dead code can discard development icon implementations.

## Props

Icon props extend React's SVG props. Each dimension resolves as explicit width/height, then `size`, then `24`. Zero remains valid. `className`, `style`, `id`, `role`, `aria-*`, and `data-*` reach the outer SVG. Built-in Lucide/Tabler icons preserve their shared root defaults for `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, and `strokeLinejoin` on the outer SVG; explicit props or CSS can override them. `color` also works with the default `stroke="currentColor"` behavior.

Sprite-rendered icons default to `aria-hidden="true"`. A meaningful icon needs an accessible label and an explicit override:

```tsx
<ArrowRight aria-hidden={false} role="img" aria-label="Continue" />
```

Use CSS `color` or a text-color class for assets drawn with `currentColor`. Built-in sprite symbols inherit the supported root presentation values from each icon instance, while authored descendant overrides remain intact. Source scanning warns only for presentation props outside that parity contract.

## Custom SVGs

Custom names match filenames without `.svg`, including case. All SVG files directly inside `public/zero-ui-icons/` are bundled, including unused assets and assets selected through dynamic names. Use this directory for trusted project files.

Development fetches the individual SVG with caching disabled and renders its markup. Pending or failed loads use a sprite fallback. Changing a name remounts the loader so the previous asset's state stays isolated. Production uses the shared sprite.

## Scanning and configuration

The build operation scans `.js`, `.jsx`, `.ts`, and `.tsx` files. Used named imports, aliases, and static namespace members are supported. Unused and type-only imports are excluded. Import icons directly from this package within the scanned source tree. Dynamic namespace lookups and module re-export graphs have limited discovery coverage.

Source detection chooses `src`, then `app`, then `pages`. Override settings with `zero-ui.config.js` or `zero-ui.config.ts` in the application directory:

```ts
import type { ZeroUIConfig } from "@react-zero-ui/icon-sprite"

export default {
  ROOT_DIR: "app",
  IMPORT_NAME: "@react-zero-ui/icon-sprite",
  OUTPUT_DIR: "public",
  SPRITE_PATH: "/icons.svg",
  CUSTOM_SVG_DIR: "zero-ui-icons",
  IGNORE_ICONS: ["CustomIcon"],
  EXCLUDE_DIRS: ["node_modules", ".git", "dist", "build", ".next", "out"],
} satisfies ZeroUIConfig
```

TypeScript config takes precedence. Invalid configuration produces returned warnings and falls back to another supported file or defaults. Config files execute as trusted Node modules with normal import caching. Each operation rescans application source and owns its state.

Configuration controls build input and output locations. Runtime URLs stay `/icons.svg` and `/zero-ui-icons/`. Applications choosing other output paths must serve those assets at the runtime URLs. Builds leave shared package files and process cwd unchanged.

## Contributing

This library lives in `packages/icon-sprite`; the private integration fixture lives in `fixtures/next-app`. Run `npm ci`, `npm run check`, and `npm run test:integration` from the repository root.

Start with `src/index.ts` for React components and `src/build.ts` for application build integration. `src/react/` owns instance rendering. `src/build/` owns source scanning, packaged icon lookup, and sprite-sheet output. `icon-library/` owns upstream synchronization, canonical assets, validation, and generated React source. Its code stays outside the published artifact.

The handwritten entrypoint remains versioned. `assets/catalog.json`, `assets/lucide/`, and `assets/tabler/` are canonical package-owned source. Maintainer packages are used only by `npm run sync:icons` to import reviewed upstream changes. Sync is additive: removed upstream icons stay available, renamed identities stay stable, and current SVG bytes refresh existing assets. Internal module paths may change; root and `/build` are the supported application interfaces.

Licensed under MIT. The package license is included in `dist/LICENSE`; upstream icon licenses ship under `assets/licenses/`.
