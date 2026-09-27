import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import * as defaults from "../dist/config.js";
import { loadConfig } from "../dist/config-loader.js";
import { createProject } from "./cli-fixtures.js";

test("defaults and source detection belong to the specified consumer, not cwd", async (t) => {
  const cwd = process.cwd();
  const root = createProject(t, { "app/index.js": "", "pages/index.js": "" });
  const config = await loadConfig(root);
  assert.deepEqual(config, {
    IMPORT_NAME: defaults.IMPORT_NAME,
    ROOT_DIR: "app",
    SPRITE_PATH: defaults.SPRITE_PATH,
    CUSTOM_SVG_DIR: defaults.CUSTOM_SVG_DIR,
    OUTPUT_DIR: defaults.OUTPUT_DIR,
    IGNORE_ICONS: [...defaults.IGNORE_ICONS],
    EXCLUDE_DIRS: [...defaults.EXCLUDE_DIRS],
  });
  assert.equal(process.cwd(), cwd);
  fs.mkdirSync(path.join(root, "src"));
  assert.equal((await loadConfig(root)).ROOT_DIR, "src");
});

test("source detection skips files and falls back to src", async (t) => {
  const root = createProject(t, { src: "not a directory", "pages/index.js": "" });
  assert.equal((await loadConfig(root)).ROOT_DIR, "pages");
  fs.rmSync(path.join(root, "pages"), { recursive: true });
  assert.equal((await loadConfig(root)).ROOT_DIR, "src");
});

test("JavaScript configuration supports relative imports and every existing override", async (t) => {
  const overrides = {
    IMPORT_NAME: "@example/icons",
    ROOT_DIR: "lib",
    SPRITE_PATH: "/nested/icons.svg",
    OUTPUT_DIR: "static",
    CUSTOM_SVG_DIR: "logos",
    IGNORE_ICONS: ["Ignored"],
    EXCLUDE_DIRS: ["vendor"],
  };
  const root = createProject(t, {
    "settings.js": `export default ${JSON.stringify(overrides)};`,
    "zero-ui.config.js": 'import config from "./settings.js"; export default config;',
  });
  assert.deepEqual(await loadConfig(root), overrides);
});

test("named exports and CommonJS configurations still work", async (t) => {
  const named = createProject(t, { "zero-ui.config.js": 'export const ROOT_DIR = "lib";' });
  const commonjs = createProject(t, {
    "package.json": '{"type":"commonjs"}',
    "zero-ui.config.js": 'module.exports = { ROOT_DIR: "components" };',
  });
  assert.equal((await loadConfig(named)).ROOT_DIR, "lib");
  assert.equal((await loadConfig(commonjs)).ROOT_DIR, "components");
});

test("TypeScript config takes precedence and preserves the typed config API", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.ts": `import type { ZeroUIConfig } from "@react-zero-ui/icon-sprite";
			export default { ROOT_DIR: "typed" } satisfies ZeroUIConfig;`,
    "zero-ui.config.js": 'export default { ROOT_DIR: "javascript" };',
  });
  assert.equal((await loadConfig(root)).ROOT_DIR, "typed");
});

test("broken TypeScript config warns with its path and falls back to JavaScript", async (t) => {
  const warning = t.mock.method(console, "warn", () => {});
  const root = createProject(t, {
    "zero-ui.config.ts": "export default { invalid",
    "zero-ui.config.js": 'export default { ROOT_DIR: "fallback" };',
  });
  assert.equal((await loadConfig(root)).ROOT_DIR, "fallback");
  assert.equal(warning.mock.callCount(), 1);
  assert.ok(warning.mock.calls[0].arguments[0].includes(path.join(root, "zero-ui.config.ts")));
});

test("invalid config values warn and use defaults rather than breaking the scanner", async (t) => {
  const warning = t.mock.method(console, "warn", () => {});
  for (const config of ['"not an object"', "{ ROOT_DIR: 42 }", "{ EXCLUDE_DIRS: [null] }"]) {
    const root = createProject(t, { "app/index.js": "", "zero-ui.config.js": `export default ${config};` });
    assert.equal((await loadConfig(root)).ROOT_DIR, "app");
  }
  assert.equal(warning.mock.callCount(), 3);
  assert.match(warning.mock.calls[1].arguments[0], /ROOT_DIR must be a string/);
  assert.match(warning.mock.calls[2].arguments[0], /EXCLUDE_DIRS must be an array of strings/);
});

test("repeated and concurrent loads cannot mutate other consumers or runtime defaults", async (t) => {
  const first = createProject(t, {
    "zero-ui.config.js": 'export default { ROOT_DIR: "lib", IGNORE_ICONS: ["Skip"], EXCLUDE_DIRS: [] };',
  });
  const second = createProject(t);
  const [a, b] = await Promise.all([loadConfig(first), loadConfig(second)]);
  a.IGNORE_ICONS.push("Check");
  a.EXCLUDE_DIRS.push("src");
  b.IGNORE_ICONS.push("Heart");
  const again = await loadConfig(first);
  assert.deepEqual(again.IGNORE_ICONS, ["Skip"]);
  assert.deepEqual(again.EXCLUDE_DIRS, []);
  assert.deepEqual((await loadConfig(second)).IGNORE_ICONS, ["CustomIcon"]);
  assert.deepEqual(defaults.IGNORE_ICONS, ["CustomIcon"]);
  assert.equal(defaults.ROOT_DIR, "src");
});
