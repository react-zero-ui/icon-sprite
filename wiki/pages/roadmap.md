---
summary: "Completed icon-ownership roadmap and the remaining intentionally deferred automation boundary."
---

# Roadmap

## Completed: own both icon libraries

Implemented. Both packs now use cumulative committed SVG archives plus a committed public catalog. Lucide and Tabler packages are maintainer-only synchronization inputs, never consumer runtime or build dependencies.

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

The committed catalog and archives are package-owned truth. Upstream packages only provide reviewed updates.

## Completed simplification goals

- Lucide and Tabler removed from consumer dependencies.
- Production sprite assets resolve only from package-owned archives.
- Development React components generate from the same canonical SVGs.
- `sync:icons` owns upstream import.
- Existing public names and sprite IDs survive cumulative sync.
- Synchronization remains manual and reviewable.

## Out of scope

No CI-driven icon synchronization yet. Automation can be considered later only if manual synchronization becomes costly.
