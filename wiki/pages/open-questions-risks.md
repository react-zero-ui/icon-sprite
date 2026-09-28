---
summary: "Route unresolved runtime configuration, browser validation, custom SVG trust, and packaging claims to their evidence and owners."
paths:
  - packages/icon-sprite/src/config.ts
  - packages/icon-sprite/src/runtime/custom-icon-dev.tsx
  - packages/icon-sprite/src/build/sprite-writer.ts
  - scripts/test-integration.ts
  - .github/workflows/check.yml
  - .github/workflows/oss-release-trusted.yml
---

# Open Questions and Risks

## Runtime URL configuration

Consumer config changes build paths while runtime URLs stay fixed. Making URLs configurable per consumer needs a design that preserves shared-install isolation and development/production agreement. Current behavior and diagnostic steps belong to [configuration](build-system/configuration.md).

## Browser and performance evidence

Automated integration inspects HTTP markup and served symbol IDs, and Chromium now compares built-in development inline rendering against production external-`<use>` rendering for the supported presentation contract. Custom-loader lifecycle, accessibility-tree behavior, browser caching, Firefox/WebKit parity, and production bundle weight still need additional evidence before broader guarantees are made. [Validation](development/validation.md) defines the current proof boundary; [rendering](runtime/rendering.md) owns the behavior.

## Custom asset scope

The system accepts trusted local SVGs. Broader untrusted inputs need an explicit sanitization boundary. Combined custom symbols and internal definitions also need collision handling if those use cases expand. [Custom icons](runtime/custom-icons.md) and [sprite output](build-system/sprite-output.md) own the details.

## Release and deployment evidence

The repository configures checks and publication, while registry trust and live deployments exist externally. A source commit or successful local test establishes no remote release outcome. [Publishing](development/publishing.md) identifies the checks and external facts to verify.

Keep detailed limitations on their owning pages. Add cross-cutting uncertainty here only when it can change an architectural or release decision.
