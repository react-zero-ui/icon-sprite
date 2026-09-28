---
summary: "Start here: the icon delivery model, package ownership, and project-wide compatibility constraints."
---

# Project Overview

`@react-zero-ui/icon-sprite` renders inline React SVGs during development and references a shared, application-built sprite in production. Inline development avoids sprite cache friction; production reuses symbol geometry.

Two workspaces separate source ownership from the published product. Private `packages/icon-library` owns cumulative Lucide/Tabler source and upstream dependencies. Published `packages/icon-sprite` receives generated React source and package-ready icon data. A private Next.js fixture exercises consumer behavior.

Preserve public component names, sprite IDs, default URLs, and supported rendering behavior. Generated output must remain reproducible from committed inputs. Consumer builds must leave the shared package installation unchanged.

Keep dependency direction one-way: icon-library generates icon-sprite; published React/build code never imports the private workspace. [Architecture](architecture.md) maps remaining module boundaries.
