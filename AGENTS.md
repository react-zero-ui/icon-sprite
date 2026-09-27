# Repository Guide

Before coding, read [wiki/AGENTS.md](wiki/AGENTS.md), including its mandatory project overview, then follow the wiki index to the smallest relevant pages and source files.

The wiki owns durable architecture, behavior, ownership, and validation knowledge. Verify change-sensitive facts against source. The [root README](README.md) owns setup and command usage.

## Working Rules

Use npm from the repository root and preserve one lockfile. Keep public imports, symbol IDs, default URLs, and environment behavior compatible. Keep canonical assets and handwritten code separate from generated output.

Prefer cohesive modules with small contracts and one owner for each rule or representation. Introduce shared packages or extra layers when an actual shared responsibility justifies them. Preserve local assets, credentials, and unrelated work.

Choose checks using [validation](wiki/pages/development/validation.md). Packaging, dependency, CLI, and runtime changes require isolated-package validation. Follow the [code quality policy](wiki/pages/development/code-quality.md) for Biome rules, import boundaries, and fix commands. Keep narrow explanations for verified tooling exceptions.

## Maintain Project Knowledge

Use the `wiki-system` skill when relevant contracts, workflows, boundaries, or decisions change. Follow [wiki maintenance](wiki/maintenance.md), regenerate routing indexes, and review freshness warnings before marking affected pages current. Keep transient status in handoffs and durable knowledge in the wiki.
