---
summary: "Planned simplification: make this package fully own cumulative Lucide and Tabler assets so consumers depend only on @react-zero-ui/icon-sprite."
---

# Roadmap

## Own both icon libraries

Move Tabler to the same ownership model already used for Lucide. Keep cumulative committed SVG archives for both packs inside this repository. Lucide and Tabler packages become maintainer-only synchronization inputs, never consumer runtime or build dependencies.

Target flow:

```text
Lucide / Tabler packages
        ↓
  npm run sync:icons
        ↓
committed SVG archives + catalog
        ↓
generated React components + build API
        ↓
consumer installs only @react-zero-ui/icon-sprite
```

Synchronization stays additive:

- New upstream icon → add archive entry and public component.
- Existing upstream icon changes → refresh SVG bytes.
- Upstream icon disappears → keep archived icon and public API.
- Upstream icon is renamed → preserve published name and sprite ID; add explicit alias when useful.

The committed catalog and archives become package-owned truth. Upstream packages only provide reviewed updates.

## Simplification goals

- Remove Lucide and Tabler from consumer dependencies.
- Resolve production sprite assets only from package-owned archives.
- Generate development React components from those same canonical SVGs where practical.
- Keep one synchronization command responsible for importing upstream changes.
- Preserve published component names and sprite IDs automatically through cumulative storage.
- Keep synchronization manual and reviewable.

## Out of scope

No CI-driven icon synchronization yet. Automation can be considered later only if manual synchronization becomes costly.
