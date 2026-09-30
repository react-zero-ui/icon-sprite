[![MIT License](https://img.shields.io/badge/License-MIT-4b00b8?style=for-the-badge&logo=github&logoColor=white)](https://github.com/react-zero-ui/icon-sprite/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@react-zero-ui/icon-sprite?style=for-the-badge&logo=npm&logoColor=white&label=npm&color=0044cc)](https://www.npmjs.com/package/@react-zero-ui/icon-sprite)
[![View Demo](https://img.shields.io/badge/View%20Demo-%E2%86%97-4b00b8?style=for-the-badge&logo=react&logoColor=white)](https://zero-ui.dev/icon-sprite)

<div align="center">
  
<h1>React Zero Icon Sprite</h1>
<h2>7,200+ React icons. One production SVG sprite.</h2>

<legend>Use Lucide and Tabler through one React API.<br/>At build time, ship <b>one SVG sprite</b> containing only the icon geometry your app uses.</legend>

<br/>

<table align="center">
  <tr>
    <td align="center" width="33%">
      <b>7,200+ Icons</b><br/>Lucide + Tabler through one package
    </td>
    <td align="center" width="33%">
      <b>Build-Time Sprite</b><br/>Ship only the icon geometry your app uses
    </td>
    <td align="center" width="33%">
      <b>Zero Runtime Icon Overhead</b><br/>Production renders native <code>&lt;use&gt;</code> references
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <b>One React API</b><br/>Use the same component model across icon sets
    </td>
    <td align="center" width="33%">
      <b>~70% Smaller Compressed HTML</b><br/>Current 135-icon demo
    </td>
    <td align="center" width="33%">
      <b>Custom Icons</b><br/>Add your own SVGs to the same sprite
    </td>
  </tr>
</table>

</div>

---

## Contents

- [Why This Library?](#why-this-library)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Configuration](#configuration)
- [How It Works](#how-it-works-under-the-hood)

---

## Why This Library?

Most React icon packages make you choose an icon set up front, then ship each icon as component-level SVG geometry.

React Zero Icon Sprite takes a different approach:

1. **One package:** Lucide and Tabler share one React API, with more icon sets able to join the same catalog over time.
2. **Build-time discovery:** `zero-icons` scans your source and finds the icons your app actually uses.
3. **One production sprite:** Used built-in icons and your custom SVGs are compiled into a single cacheable sprite.
4. **Small production markup:** Icon components render native `<svg><use /></svg>` references instead of repeating SVG geometry.

You can choose from thousands of icons during development while production ships only the geometry your application needs.

> [!NOTE]
> [View the live demo](https://zero-ui.dev/icon-sprite)

---

## Quick Start

### 1. Install

```bash
npm install @react-zero-ui/icon-sprite
```

React 17+ is supported. The `zero-icons` build step requires Node.js 22.18+ on Node 22, or Node.js 24.11+.

### 2. Use Icons

```tsx
import { ArrowRight, Mail } from "@react-zero-ui/icon-sprite";

<ArrowRight size={24} className="text-gray-600" />
<Mail width={24} height={24} />
```

### 3. Build for Production

> [!CAUTION]
> Run this **before** your app build so the sprite exists.

```bash
npx zero-icons
```

Or add it to your `package.json`:
```json
{
  "scripts": {
    "prebuild": "zero-icons",
    "build": "your build command"
  }
}
```

That's it. `zero-icons` scans your source and writes `public/icons.svg` before your application build.

---

## Usage

### Lucide Icons

```tsx
import { ArrowRight, Mail } from "@react-zero-ui/icon-sprite";

<ArrowRight size={24} className="text-gray-600" />
<Mail width={24} height={24} />
```

### Tabler Icons

tabler icons are imported with the `Icon` prefix, e.g. `IconBrandGithub`

```tsx
import { IconBrandGithub, IconHeart } from "@react-zero-ui/icon-sprite";

<IconBrandGithub size={24} className="text-gray-600" />
<IconHeart width={24} height={24} />
```

### Custom Icons

Drop your own SVGs into **`/public/zero-ui-icons/`**, then use `<CustomIcon />`:

> [!TIP]
>```txt
>📁/public
>   └──📁/zero-ui-icons/
>       └──dog.svg
>```
>```tsx
>import { CustomIcon } from "@react-zero-ui/icon-sprite";
>
><CustomIcon name="dog" size={24} />
>```

The `name` prop **must match** the file name (without `.svg`).

> [!NOTE]
> In dev you may see a brief FOUC using custom icons; this is removed in production.

---

## Configuration

Most apps need no configuration. If your source lives somewhere other than `src`, `app`, or `pages`, add `zero-ui.config.ts`:

```ts
import type { ZeroUIConfig } from "@react-zero-ui/icon-sprite"

export default {
  ROOT_DIR: "frontend",
} satisfies ZeroUIConfig
```

The config also supports custom scan exclusions, import names, output locations, and custom SVG directories.

---

## How It Works (Under the Hood)

<details>
<summary><b>See how development and production rendering differ</b></summary>

### Development: DX First

Generated icon components follow this shape:

```tsx
export function ArrowRight(props) {
  if (process.env.NODE_ENV !== "production") {
    return <svg {...props}>{/* packaged SVG geometry */}</svg>
  }

  return <svg {...props}><use href="/icons.svg#arrow-right" /></svg>
}
```

This ensures:

* Development uses inline SVG geometry
* Familiar props such as `size`, `strokeWidth`, and `className`
* Built-in icons do not depend on fetching the production sprite during development
* Production reuses shared geometry through the sprite

### Production Mode: Zero Runtime Icon Overhead

Production icons compile to native SVG `<use>` references with no icon geometry or icon-library runtime shipped to the client.

At build time:

1. `zero-icons` scans `.js`, `.jsx`, `.ts`, and `.tsx` source with Babel AST traversal
2. Named imports are resolved across the package-owned icon catalog
3. Only used built-in icon geometry is selected from Lucide and Tabler
4. Project custom SVGs are added to the same sprite
5. The final sprite is written to `public/icons.svg`
6. Production icon wrappers render `<use href="/icons.svg#icon-id" />`

### The Build Pipeline (`npx zero-icons`)

The CLI is backed by the package's Node build API. It discovers project configuration, scans icon usage, resolves packaged SVG data, and atomically writes the sprite without modifying the installed package.

</details>

---

Part of the [React Zero-UI](https://github.com/react-zero-ui) ecosystem.

Created by and maintained by [Serbyte Development](https://www.serbyte.net/)
