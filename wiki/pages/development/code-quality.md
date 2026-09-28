---
summary: "Maintain Biome enforcement without obscuring module boundaries or excluding generated dependencies from analysis."
paths:
  - biome.json
---

# Code Quality

[biome.json](../../../biome.json) owns the rule set and assists. Root lint fails on warnings, including stale suppressions. Keep TypeScript checks alongside Biome. Fix commands and ordinary usage belong to the [root README](../../../README.md#development).

## Boundary enforcement

`noNodejsModules` and restricted-import rules enforce the [architecture](../architecture.md#shared-contracts). The two public facades have narrow barrel exceptions. Generated exports remain generator-owned. Validate rule changes with both rejected cross-domain imports and accepted imports within each domain.

Keep the [.ts execution / .js emission policies](workflow.md#editing-boundaries) distinct in import-extension rules. Fixes must preserve runtime resolution. Console allowances are limited to explicit command/test contexts; React debug logging fails lint.

## Scanner exclusions and assists

Regular `!` exclusions leave generated wrappers, declarations, compiled output, and Next types available for dependency analysis. `!!` force exclusions cover non-module assets and reports. Keep `dist` resolvable because tests and the fixture import the built package.

Assists sort imports, JSX attributes, interface members, CSS properties, and JSON. Package manifests have their own ordering and are excluded from generic key sorting. Review fixes where attribute or property order affects overrides.

## Exceptions and upgrades

Investigate static-analysis failures as design feedback. Keep cohesive operations intact when splitting would create forwarding helpers; document a narrow exception with the concrete reason. Existing resolver suppressions and ordering exceptions explain themselves beside the affected source.

Selected nursery rules need review during Biome upgrades. Preserve strictness while checking for changed semantics or false positives. Policy probes should exercise import boundaries, unhandled promises, unsafe types, focused/skipped tests, and a warning-only failure. Remove probes before package generation.
