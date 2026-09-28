---
summary: "Start here: React icon delivery, two build stages, compatibility commitments, and ownership of generated code."
---

# Project Overview

`@react-zero-ui/icon-sprite` is a React icon library that combines component-based development with shared SVG delivery in production. Inline development rendering avoids external-sprite cache friction. Production components reference reusable symbols in a consumer-generated asset.

The repository has one publishable library and one private Next.js integration fixture. The fixture exercises the library as an application would consume it. Native npm workspaces coordinate their development.

The handwritten React entrypoint is `src/index.ts`; the Node build interface is `generateSprite()` in `src/build.ts`. Application build integrations call this operation directly. The historical `zero-icons` command delegates to it for compatibility.

Package-owned `assets/catalog.json` plus cumulative Lucide and Tabler SVG archives define the icon library. Upstream icon packages are maintainer-only synchronization inputs. Ordinary library builds generate React code only from committed package-owned state; consumer builds scan application usage and generate a sprite from those same assets.

Public imports, sprite IDs, historical icon names, default URLs, and development/production behavior are compatibility commitments. Catalog and SVG archives are canonical input; generated React files are replaceable output.

Prefer deep modules with small contracts. Give each naming rule, representation, and side effect one owner. Keep runtime rendering independent of Node-only build machinery. Consumer generation owns its operation's state and output, leaving shared package files and process cwd unchanged.
