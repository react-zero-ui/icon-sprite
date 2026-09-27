---
summary: "Start here: React icon delivery, two build stages, compatibility commitments, and ownership of generated code."
---

# Project Overview

`@react-zero-ui/icon-sprite` is a React icon library that combines component-based development with shared SVG delivery in production. Inline development rendering avoids external-sprite cache friction. Production components reference reusable symbols in a consumer-generated asset.

The repository has one publishable library and one private Next.js integration fixture. The fixture exercises the library as an application would consume it. Native npm workspaces coordinate their development.

The handwritten React entrypoint is `src/index.ts`; the Node build interface is `generateSprite()` in `src/build.ts`. Application build integrations call this operation directly. The historical `zero-icons` command delegates to it for compatibility.

Two build stages shape the architecture. Maintainers generate the library's complete catalog, wrappers, and packaged manifests. Consumers scan their application and generate a sprite before the application build. Changes must preserve agreement between component names, wrapper symbol IDs, and emitted symbols across both stages.

Public imports, historical icon names, default URLs, and development/production behavior are compatibility commitments. The SVG archive is canonical input; generated React files and manifests are replaceable output.

Prefer deep modules with small contracts. Give each naming rule, representation, and side effect one owner. Keep runtime rendering independent of Node-only build machinery. Consumer generation owns its operation's state and output, leaving shared package files and process cwd unchanged.
