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

`IconProps` defines this library's instance API: `size`, `width`, `height`, `className`, `style`, `id`, `role`, `tabIndex`, `focusable`, `ref`, React events, `aria-*`, `data-*`, and the supported presentation props `color`, `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, and `strokeLinejoin`. Each dimension resolves as explicit width/height, then `size`, then `24`. Zero remains valid. Built-ins keep shared presentation defaults on the outer SVG, followed by caller overrides. `color` supplies the default `stroke="currentColor"` behavior.

The component owns its geometry and children. Upstream conveniences such as `title`, `absoluteStrokeWidth`, and `nonScalingStroke` are excluded from this API. Use `aria-label` for accessible names.

Development and production icons default to `aria-hidden="true"`, including when a label or role is supplied. A meaningful icon needs an accessible label and an explicit override:

```tsx
<ArrowRight aria-hidden={false} role="img" aria-label="Continue" />
```

Use CSS `color` or a text-color class for assets drawn with `currentColor`. Built-in sprite symbols inherit the supported root presentation values from each icon instance, while authored descendant overrides remain intact. Source scanning warns only for presentation props outside that parity contract.

## Custom SVGs

Custom names match filenames without `.svg`, including case. All SVG files directly inside `public/zero-ui-icons/` are bundled, including unused assets and assets selected through dynamic names. Use this directory for trusted project files.

Development fetches the individual SVG with caching disabled and renders its markup. Pending or failed loads use a sprite fallback. Changing a name remounts the loader so the previous asset's state stays isolated. Production uses the shared sprite.

Custom artwork retains its root attributes and descendant styling. Instance props live on the outer SVG; fixed colors and strokes inside the artwork remain fixed. Author `inherit` or `currentColor` where instance styling should apply. The instance controls dimensions and the custom filename supplies the sprite ID. A custom filename that collides with a used built-in ID fails the build and leaves the previous sprite intact. Application stylesheet selectors cannot target an external sprite's internal classes.

Custom gradient URLs remain authored. Our WebKit test found that fragment-only paint references such as `url(#gradient)` can render blank through an external sprite. Verify gradient-dependent custom artwork in your target browsers.

## Scanning and configuration

The build operation scans `.js`, `.jsx`, `.ts`, and `.tsx` files. Use named imports or named aliases directly from this package within the scanned source tree. Value namespace imports (`import * as Icons`) fail the build even when unused. Type-only imports are excluded from runtime discovery. The scanner does not follow module re-export graphs.

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

This published library lives in `packages/icon-sprite`; canonical icon source lives in private `packages/icon-library`; the integration fixture lives in `fixtures/next-app`. Run `npm ci`, `npm run check`, and `npm run test:integration` from repository root.

Start with `src/index.ts` for React components and `src/build.ts` for application build integration. `src/react/` owns instance rendering. `src/build/` owns source scanning, packaged icon lookup, and sprite-sheet output. Private `../icon-library/` owns upstream synchronization, canonical assets, validation, and generation into this package.

The handwritten entrypoints remain versioned. This package's `assets/catalog.json` and licenses are generated package inputs; canonical catalog/SVGs/licenses live only in `packages/icon-library/assets/`. Upstream packages are private-workspace dependencies used only by root `npm run sync:icons`. Internal module paths may change; root and `/build` are the supported application interfaces.

Licensed under MIT. The package license is included in `dist/LICENSE`; upstream icon licenses ship under `assets/licenses/`.
