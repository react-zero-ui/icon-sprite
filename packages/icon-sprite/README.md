# @react-zero-ui/icon-sprite

Use Lucide, Tabler, and custom SVG icons through React components. Development renders inline SVGs; production renders references to a shared sprite containing the built-in icons your source uses and your custom SVG assets.

## Install

```sh
npm install @react-zero-ui/icon-sprite
```

React 17 or newer is a peer dependency. The build CLI requires Node.js 22.18+ on the 22.x line, or Node.js 24.11+. Node 24 LTS is used for repository development.

```tsx
import { ArrowRight, IconBrandGithub, CustomIcon } from "@react-zero-ui/icon-sprite";

<ArrowRight size={24} className="text-gray-600" />
<IconBrandGithub width={32} height={32} />
<CustomIcon name="company-logo" size={40} />
```

Place `company-logo.svg` in `public/zero-ui-icons/` for the custom example.

## Production builds

Run the CLI from your application directory before its build:

```json
{
  "scripts": {
    "prebuild": "zero-icons",
    "build": "next build"
  }
}
```

The same prebuild command works with other React application build tools. The application must serve its generated `public/icons.svg` at `/icons.svg`. Configure production caching and invalidation in the application or hosting platform.

In production, an icon renders approximately:

```html
<svg aria-hidden="true" width="24" height="24">
  <use href="/icons.svg#arrow-right"></use>
</svg>
```

The production branch keeps a small React wrapper. Bundlers that replace `process.env.NODE_ENV` and remove dead code can discard development icon implementations. The browser reuses the external SVG definitions.

## Props

Icon props extend React's SVG props. Width and height default to `24`; explicit dimensions take precedence over `size`. `className`, `style`, `id`, `role`, `aria-*`, and `data-*` reach the outer SVG. `strokeWidth` uses the `--icon-stroke-width` CSS property so it can reach sprite contents.

Sprite-rendered icons are decorative by default with `aria-hidden="true"`. For a meaningful icon, provide an accessible label and override that default:

```tsx
<ArrowRight aria-hidden={false} role="img" aria-label="Continue" />
```

Use CSS `color` or a text-color class for icons drawn with `currentColor`. Presentation attributes fixed inside the source SVG can differ from inline component behavior when rendered through `<use>`. The scanner reports potentially incompatible props such as `fill`, `stroke`, and `strokeLinecap` for review.

## Custom SVGs

Custom names match filenames without `.svg`. All SVG files directly inside `public/zero-ui-icons/` are bundled, including assets selected through dynamic names. Use this directory for trusted project assets.

Development fetches the individual SVG with caching disabled and renders its markup. The initial load can briefly show a fallback. Production uses the same external sprite as built-in icons.

## Scanning and configuration

The CLI scans `.js`, `.jsx`, `.ts`, and `.tsx` files. It supports used named imports, aliases, and static namespace members. Unused and type-only imports are excluded. Import icons directly from this package within the scanned source tree. Dynamic namespace lookups require statically named imports; the scanner reports unsupported dynamic member access.

The source directory is detected in this order: `src`, `app`, then `pages`. Override the scanner with `zero-ui.config.js` or `zero-ui.config.ts` in your application directory:

```js
/** @type {import("@react-zero-ui/icon-sprite").ZeroUIConfig} */
export default {
  ROOT_DIR: "app",
  IMPORT_NAME: "@react-zero-ui/icon-sprite",
  OUTPUT_DIR: "public",
  SPRITE_PATH: "/icons.svg",
  CUSTOM_SVG_DIR: "zero-ui-icons",
  IGNORE_ICONS: ["CustomIcon"],
  EXCLUDE_DIRS: ["node_modules", ".git", "dist", "build", ".next", "out"],
};
```

TypeScript configuration takes precedence. Loading a `.ts` config requires Node's type stripping or a compatible TypeScript loader. Invalid configuration is reported and falls back to another supported configuration file or defaults.

Configuration controls CLI scanning and output. Runtime wrappers currently use `/icons.svg`, and the custom development loader uses `/zero-ui-icons/`. When changing CLI output paths, arrange for the application to serve those generated assets at the runtime URLs. This existing separation allows multiple applications to use one installation without modifying its runtime defaults.

The CLI runs independently for each consuming project. It writes the sprite through a temporary sibling file followed by an atomic rename. Parse, asset, and write errors produce a nonzero exit and preserve an existing sprite. Missing icon definitions produce warnings and require review before deployment.

## Contributing

This package lives in `packages/icon-sprite` within the repository. Run `npm ci`, `npm run check`, and `npm run test:integration` from the repository root. The private Next.js fixture lives in `fixtures/next-app`.

`assets/lucide` is the canonical historical SVG archive. Maintainer scripts derive icon wrappers, local development components, source exports, and CLI manifests. Edit the source assets or generator when changing generated behavior.

Licensed under MIT. The license is included in `dist/LICENSE`.
