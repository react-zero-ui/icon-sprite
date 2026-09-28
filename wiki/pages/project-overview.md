---
summary: "Start here: the icon delivery model, package ownership, and project-wide compatibility constraints."
---

# Project Overview

`@react-zero-ui/icon-sprite` renders inline React SVGs during development and references a shared, application-built sprite in production. Inline development avoids sprite cache friction; production reuses symbol geometry.

One published package owns the cumulative Lucide/Tabler library. Upstream dependencies supply explicit updates. A private Next.js fixture exercises consumer behavior.

Preserve public component names, sprite IDs, default URLs, and supported rendering behavior. Generated output must remain reproducible from committed inputs. Consumer builds must leave the shared package installation unchanged.

Name modules by their owned domain and give each rule one owner. [Architecture](architecture.md) maps React rendering, consumer builds, and icon-library generation. Use the wiki index to select the relevant contract before editing.
