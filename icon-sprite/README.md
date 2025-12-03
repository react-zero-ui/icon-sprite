# @react-zero-ui/icon-sprite

[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/react-zero-ui/icon-sprite/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@react-zero-ui/icon-sprite.svg)](https://www.npmjs.com/package/@react-zero-ui/icon-sprite)

**The most performant way to use icons in React.**

Use **6,800+ Lucide & Tabler icons** in development with full React DX. Ship a **single optimized SVG sprite** in production — only the icons you actually used.

🚀 Zero Runtime • 📦 ~300% Smaller HTML • 🎨 6,800+ Icons • 🛠️ DX First • ⚡ Any Framework

---

## Why This Library?

SVG sprites are still the most performant way to deliver flat icons on the web. They are significantly smaller than React components and can be cached aggressively by the browser.

**However, using sprites in development is a pain.**
Browsers cache sprites so aggressively that you often have to close the tab and reopen it just to see a new icon, even with cache disabled in DevTools.

**This library solves that problem:**
1. **In Development:** It uses standard React components. No caching issues, instant HMR, and full prop support.
2. **In Production:** It compiles everything into a single, highly optimized SVG sprite that is loaded once and cached forever.

You get the **Developer Experience** of a component library with the **Performance** of a handwritten sprite.

> ![Demo](https://img.shields.io/badge/Live_Demo-4b00b8) **See the difference:** [View Demo ↗](https://zero-ui.dev/icon-sprite)

---

## Benchmarks (150 Icons)

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

> ![Caution](https://img.shields.io/badge/Caution-red) Run this **before** your app build so the sprite exists.

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

> ![Warning](https://img.shields.io/badge/Warning-orange) **Pass `size`, or both `width` and `height`, to ensure identical dev/prod rendering.** Dev defaults (Lucide 24×24) differ from sprite viewBoxes in production.

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

```txt
📁/public
   └──📁/zero-ui-icons/
       └──dog.svg
```

```tsx
import { CustomIcon } from "@react-zero-ui/icon-sprite";

<CustomIcon name="dog" size={24} />
```

> ![Tip](https://img.shields.io/badge/Tip-green) The `name` prop **must match** the file name (without `.svg`).

> ![Note](https://img.shields.io/badge/Note-blue) In dev you may see a brief FOUC using custom icons; this is removed in production.

---

## Configuration

Customize the scanner behavior by creating a `zero-ui.config.js` file in your project root:

```js
// zero-ui.config.js
export default {
  // Package name to scan for (default: "@react-zero-ui/icon-sprite")
  IMPORT_NAME: "@react-zero-ui/icon-sprite",

  // Path where the sprite will be served (default: "/icons.svg")
  SPRITE_PATH: "/icons.svg",

  // Directory to scan for icon usage (default: "src")
  ROOT_DIR: "src",

  // Directory containing custom SVG files (default: "zero-ui-icons")
  CUSTOM_SVG_DIR: "zero-ui-icons",

  // Output directory for the sprite (default: "public")
  OUTPUT_DIR: "public",

  // Icon names to ignore during scanning (default: ["CustomIcon"])
  IGNORE_ICONS: ["CustomIcon"],

  // Directories to exclude from scanning
  EXCLUDE_DIRS: ["node_modules", ".git", "dist", "build", ".next", "out"],
};
```

> ![Note](https://img.shields.io/badge/Note-blue) The scanner defaults to scanning only the `src` directory and automatically excludes `node_modules` and other common build directories.

---

## How It Works

### Development: DX First

In dev, each icon wrapper renders the real React component:

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
- Dev uses real React components (`lucide-react` or `@tabler/icons-react`)
- Full props support (e.g. `strokeWidth`, `className`)
- No caching issues from SVG sprites
- No FOUC (Flash of Unstyled Content)

### Production: Maximum Performance

At build time (`npx zero-icons`):

1. We scan your codebase for all icons using Babel + AST traversal
2. We generate a single SVG sprite sheet (`public/icons.svg`)
3. The wrapper components switch to `<use href="/icons.svg#icon-id" />`

| Script | Purpose |
| --- | --- |
| `scan-icons.js` | Parse your codebase for used icons |
| `used-icons.js` | Collects a list of unique icon names |
| `build-sprite.js` | Generates `icons.svg` from used Lucide + Tabler + custom SVGs |

---

Part of the [React Zero-UI](https://github.com/react-zero-ui) ecosystem.

Made with ❤️ by [@austinserb](https://www.austinserb.com/)
