---
summary: "Track deferred upstream-update automation and a possible simpler development sprite architecture."
---

# Roadmap

The package-owned archive migration is complete. Its current behavior belongs to [Icon Library](icon-library.md).

## Deferred: automated upstream updates

Synchronization remains manual and reviewable. CI-driven synchronization is outside the agreed scope. Reconsider automation when manual updates become costly.

## Deferred: full built-in sprite in development

Current development rendering stays as-is: built-ins use generated inline SVG implementations, custom icons use the direct-file development loader, and production uses the trimmed external sprite.

Revisit a sprite-only built-in renderer if generated package size, module count, or dev/prod duplication becomes costly. Candidate design: generate one complete built-in `icons.svg` when development starts, render built-ins through the same external `<use>` path in all environments, keep the custom SVG development loader, and continue source-scanning only for the trimmed production sprite. A full built-in sprite measured about 2.9 MiB raw for 7,293 symbols. No watcher or DOM-injected sprite should be necessary.
