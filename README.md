[![MIT License](https://img.shields.io/badge/License-MIT-4b00b8?style=for-the-badge&logo=github&logoColor=white)](https://github.com/react-zero-ui/icon-sprite/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@react-zero-ui/icon-sprite?style=for-the-badge&logo=npm&logoColor=white&label=npm&color=0044cc)](https://www.npmjs.com/package/@react-zero-ui/icon-sprite)
[![View Demo](https://img.shields.io/badge/View%20Demo-%E2%86%97-4b00b8?style=for-the-badge&logo=react&logoColor=white)](https://zero-ui.dev/icon-sprite)

<div align="center">
  
<h1>React Zero Icon Sprite - Zero Runtime SVG Icons</h1>
<h2>The most performant way to use icons in React</h2>

<legend><b>Use over 6,800+</b> Lucide & Tabler <code>&lt;Icon /&gt;</code> in development. </br> Ship <b>one SVG sprite</b> in production - only the icons you used.</legend>

<br/>

<table align="center">
  <tr>
    <td align="center" width="33%">
      🚀 <b>Zero Runtime</b><br/>Compiles to native <code>&lt;use&gt;</code> tags
    </td>
    <td align="center" width="33%">
      📦 <b>~300% Smaller</b><br/>No HTML bloat or JS overhead
    </td>
    <td align="center" width="33%">
      🎨 <b>6,800+ Icons</b><br/>Full Lucide & Tabler support
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      🛠️ <b>DX First</b><br/>Full component DX in Dev
    </td>
    <td align="center" width="33%">
      ⚡ <b>Any Framework</b><br/>Next.js, Vite, Remix, Webpack
    </td>
    <td align="center" width="33%">
      🧩 <b>Custom Icons</b><br/>First-class support for your SVGs
    </td>
  </tr>
</table>

</div>

---

## Contents

- [Why This Library?](#why-this-library)
- [Benchmarks](#-benchmarks-150-icons)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [How It Works](#how-it-works-under-the-hood)

---

## Why This Library?

SVG sprites are still the most performant way to deliver flat icons on the web. They are significantly smaller than React components and can be cached aggressively by the browser.

**However, using sprites in development is a pain.**
Browsers cache sprites so aggressively that you often have to close the tab and reopen it just to see a new icon, even with cache disabled in DevTools.

**This library solves that problem:**
1.  **In Development:** It uses standard React components. No caching issues, instant HMR (Hot Module Replacement), and full prop support.
2.  **In Production:** It compiles everything into a single, highly optimized SVG sprite that is loaded once and cached forever.

You get the **Developer Experience** of a component library with the **Performance** of a handwritten sprite.

> [!NOTE]
> **See the difference for yourself:** [View Live Demo ↗](https://zero-ui.dev/icon-sprite)

---

## ⚡ Benchmarks (150 Icons)

| Library | HTML Size |
|---------|-----------|
| **Lucide React** | 19.5kb |
| **@react-zero-ui** | **7.5kb** |

---

## Quick Start

### 1. Install

```bash
npm install @react-zero-ui/icon-sprite
```

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

That's it! Your icons are now optimized for production.

---

## Usage

### Lucide Icons

```tsx
import { ArrowRight, Mail } from "@react-zero-ui/icon-sprite";

<ArrowRight size={24} className="text-gray-600" />
<Mail width={24} height={24} />
```

### Tabler Icons

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
> The `name` prop **must match** the file name (without `.svg`).

> [!NOTE]
> In dev you may see a brief FOUC using custom icons; this is removed in production.

---

## How It Works (Under the Hood)

<details>
<summary><b>🔍 Click to see how we handle Dev vs. Prod</b></summary>

### Development: DX First

In dev, each icon wrapper looks like this:

```tsx
import { ArrowRight as DevIcon } from "lucide-react";

export const ArrowRight = (props) =>
  process.env.NODE_ENV === "development" ? (
    <DevIcon {...props} />
  ) : (
    <svg {...props}>
      <use href={`/icons.svg#arrow-right`} />
    </svg>
  );
```

This ensures:

* Dev uses real React components
* Full props support (e.g. `strokeWidth`, `className`)
* No caching issues from SVG sprites
* No FOUC (Flash of Unstyled Content)

### Production Mode: Minimal Runtime, Maximum Speed

At build time:

1. We scan your codebase for all icons statically using Babel + AST traversal
2. We generate a single SVG sprite sheet (`public/icons.svg`)
3. The wrapper components switch to `<use href="/icons.svg#icon-id" />`

### The Build Pipeline (`npx zero-icons`)

| Script | Purpose |
| --- | --- |
| `scan-icons.js`   | Parse your codebase for used icons (`Icon` usage or named imports) |
| `used-icons.js`   | Collects a list of unique icon names |
| `build-sprite.js` | Uses [`svgstore`](https://github.com/svgstore/svgstore) to generate `icons.svg` from used Lucide + Tabler + custom SVGs |

</details>

---

Part of the [React Zero-UI](https://github.com/react-zero-ui) ecosystem.

Made with ❤️ for the React community by [@austinserb](https://www.austinserb.com/)
