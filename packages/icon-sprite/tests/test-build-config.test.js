import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { resolveSpriteBuildConfig } from "../dist/build/resolve-build-config.js"
import { DEFAULT_CONFIG } from "../dist/config.js"
import { createProject } from "./cli-fixtures.js"

test("project resolution owns defaults, absolute paths, and source detection without changing cwd", async (t) => {
  const cwd = process.cwd()
  const root = createProject(t, { "app/index.js": "", "pages/index.js": "" })
  const project = await resolveSpriteBuildConfig(root)
  assert.deepEqual(project, {
    customDirectory: path.join(root, "public/zero-ui-icons"),
    outputFile: path.join(root, "public/icons.svg"),
    scan: {
      sourceDirectory: path.join(root, "app"),
      projectDirectory: root,
      importName: DEFAULT_CONFIG.IMPORT_NAME,
      ignoreIcons: [...DEFAULT_CONFIG.IGNORE_ICONS],
      excludeDirectories: [...DEFAULT_CONFIG.EXCLUDE_DIRS],
    },
    warnings: [],
  })
  assert.equal(process.cwd(), cwd)
  fs.mkdirSync(path.join(root, "src"))
  assert.equal((await resolveSpriteBuildConfig(root)).scan.sourceDirectory, path.join(root, "src"))
})

test("source detection skips files and falls back to src", async (t) => {
  const root = createProject(t, { src: "not a directory", "pages/index.js": "" })
  assert.equal(
    (await resolveSpriteBuildConfig(root)).scan.sourceDirectory,
    path.join(root, "pages")
  )
  fs.rmSync(path.join(root, "pages"), { recursive: true })
  assert.equal((await resolveSpriteBuildConfig(root)).scan.sourceDirectory, path.join(root, "src"))
})

test("relative config imports and all existing overrides resolve at one boundary", async (t) => {
  const overrides = {
    IMPORT_NAME: "@example/icons",
    ROOT_DIR: "lib",
    SPRITE_PATH: "/nested/icons.svg",
    OUTPUT_DIR: "static",
    CUSTOM_SVG_DIR: "logos",
    IGNORE_ICONS: ["Ignored"],
    EXCLUDE_DIRS: ["vendor"],
  }
  const root = createProject(t, {
    "settings.js": `export default ${JSON.stringify(overrides)};`,
    "zero-ui.config.js": 'import config from "./settings.js"; export default config;',
  })
  assert.deepEqual(await resolveSpriteBuildConfig(root), {
    customDirectory: path.join(root, "static/logos"),
    outputFile: path.join(root, "static/nested/icons.svg"),
    scan: {
      sourceDirectory: path.join(root, "lib"),
      projectDirectory: root,
      importName: "@example/icons",
      ignoreIcons: ["Ignored"],
      excludeDirectories: ["vendor"],
    },
    warnings: [],
  })
})

test("named exports and CommonJS configuration remain supported", async (t) => {
  const named = createProject(t, { "zero-ui.config.js": 'export const ROOT_DIR = "lib";' })
  const commonjs = createProject(t, {
    "package.json": '{"type":"commonjs"}',
    "zero-ui.config.js": 'module.exports = { ROOT_DIR: "components" };',
  })
  assert.equal(
    (await resolveSpriteBuildConfig(named)).scan.sourceDirectory,
    path.join(named, "lib")
  )
  assert.equal(
    (await resolveSpriteBuildConfig(commonjs)).scan.sourceDirectory,
    path.join(commonjs, "components")
  )
})

test("valid TypeScript config prevents execution of the lower-priority JavaScript module", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.ts":
      'import type { ZeroUIConfig } from "@react-zero-ui/icon-sprite"; export default { ROOT_DIR: "typed" } satisfies ZeroUIConfig;',
    "zero-ui.config.js": 'throw new Error("The lower-priority config must remain unexecuted");',
  })
  const result = await resolveSpriteBuildConfig(root)
  assert.equal(result.scan.sourceDirectory, path.join(root, "typed"))
  assert.deepEqual(result.warnings, [])
})

test("broken TypeScript config returns an actionable warning and falls back to JavaScript", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.ts": "export default { invalid",
    "zero-ui.config.js": 'export default { ROOT_DIR: "fallback" };',
  })
  const result = await resolveSpriteBuildConfig(root)
  assert.equal(result.scan.sourceDirectory, path.join(root, "fallback"))
  assert.equal(result.warnings.length, 1)
  assert.ok(result.warnings[0].includes(path.join(root, "zero-ui.config.ts")))
})

test("invalid config values fall back and preserve per-project diagnostics", async (t) => {
  const roots = ['"not an object"', "{ ROOT_DIR: 42 }", "{ EXCLUDE_DIRS: [null] }"].map((config) =>
    createProject(t, { "app/index.js": "", "zero-ui.config.js": `export default ${config};` })
  )
  const projects = await Promise.all(roots.map((root) => resolveSpriteBuildConfig(root)))
  for (const [index, project] of projects.entries()) {
    assert.equal(project.scan.sourceDirectory, path.join(roots[index], "app"))
    assert.equal(project.warnings.length, 1)
  }
  assert.ok(projects[1].warnings[0].includes("ROOT_DIR must be a string"))
  assert.ok(projects[2].warnings[0].includes("EXCLUDE_DIRS must be an array of strings"))
})

test("repeated and concurrent resolutions cannot mutate another consumer or runtime defaults", async (t) => {
  const first = createProject(t, {
    "zero-ui.config.js":
      'export default { ROOT_DIR: "lib", IGNORE_ICONS: ["Skip"], EXCLUDE_DIRS: [] };',
  })
  const second = createProject(t)
  const [a, b] = await Promise.all([
    resolveSpriteBuildConfig(first),
    resolveSpriteBuildConfig(second),
  ])
  a.scan.ignoreIcons.push("Check")
  a.scan.excludeDirectories.push("src")
  b.scan.ignoreIcons.push("Heart")
  const again = await resolveSpriteBuildConfig(first)
  assert.deepEqual(again.scan.ignoreIcons, ["Skip"])
  assert.deepEqual(again.scan.excludeDirectories, [])
  assert.deepEqual((await resolveSpriteBuildConfig(second)).scan.ignoreIcons, ["CustomIcon"])
  assert.deepEqual(DEFAULT_CONFIG.IGNORE_ICONS, ["CustomIcon"])
})
