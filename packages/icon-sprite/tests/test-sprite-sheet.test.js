import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { buildSpriteSheet, generateSprite } from "@react-zero-ui/icon-sprite/build"
import { createProject, svg, writeProject } from "./cli-fixtures.js"

const cli = fileURLToPath(new URL("../dist/command.js", import.meta.url))
const compareText = (left, right) => left.localeCompare(right)
const builtInCheckSymbolPattern = /<symbol\b[^>]*id="check"[^>]*>/
const customCaseSensitiveSymbolPattern = /<symbol\b[^>]*id="CaseSensitive"[^>]*>/
const symbolIdPattern = /<symbol\b[^>]*\bid="([^"]+)"/g
const tablerCheckSymbolPattern = /<symbol\b[^>]*id="tabler-check"[^>]*>/
const namespaceImportError = /Namespace icon imports/
const nestedCustomSvgPattern =
  /<svg x="4" y="4" width="8" height="8" viewBox="0 0 10 10"><path fill="url\(#paint\)" d="M0 0h10v10z"\/><\/svg>/
const localCustomDefsPattern = /<symbol[^>]*id="nested"[^>]*><defs>/

function symbolIds(file) {
  return [...fs.readFileSync(file, "utf8").matchAll(symbolIdPattern)]
    .map((match) => match[1])
    .sort(compareText)
}

test("the existing generateSprite name aliases the consumer sprite-sheet build operation", () => {
  assert.equal(generateSprite, buildSpriteSheet)
})

test("the public build API returns config diagnostics without console side effects", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.ts": "export default { invalid",
    "src/view.js": "export const value = 1;",
  })
  const log = t.mock.method(console, "log", () => undefined)
  const warn = t.mock.method(console, "warn", () => undefined)
  const result = await buildSpriteSheet(root)
  assert.equal(result.iconCount, 0)
  assert.equal(result.outputFile, path.join(root, "public/icons.svg"))
  assert.equal(result.warnings.length, 1)
  assert.ok(result.warnings[0].includes("zero-ui.config.ts"))
  assert.equal(log.mock.callCount(), 0)
  assert.equal(warn.mock.callCount(), 0)
})

test("built-in symbols inherit root presentation while custom SVGs stay authored", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import { Check, IconCheck, CustomIcon, MyLogo } from "@react-zero-ui/icon-sprite";
			export const icons = <><Check/><Check/><IconCheck/><CustomIcon name="CaseSensitive"/><MyLogo/></>;`,
    "public/zero-ui-icons/my-logo.svg": svg,
    "public/zero-ui-icons/CaseSensitive.svg": svg,
    "public/zero-ui-icons/unused.svg": svg,
    "public/zero-ui-icons/notes.txt": "not an SVG",
  })
  const result = await buildSpriteSheet(root)
  assert.deepEqual(symbolIds(result.outputFile), [
    "CaseSensitive",
    "check",
    "my-logo",
    "tabler-check",
    "unused",
  ])
  assert.equal(result.iconCount, 5)
  assert.deepEqual(result.warnings, [])
  const output = fs.readFileSync(result.outputFile, "utf8")
  assert.ok(output.includes('viewBox="0 0 16 16"'))
  assert.ok(output.includes('fill="none"'))
  assert.ok(output.includes('stroke="currentColor"'))
  const builtInSymbol = output.match(builtInCheckSymbolPattern)?.[0]
  const tablerSymbol = output.match(tablerCheckSymbolPattern)?.[0]
  const customSymbol = output.match(customCaseSensitiveSymbolPattern)?.[0]
  for (const symbol of [builtInSymbol, tablerSymbol]) {
    assert.ok(symbol?.includes('fill="inherit"'))
    assert.ok(symbol?.includes('stroke="inherit"'))
    assert.ok(symbol?.includes('stroke-width="inherit"'))
    assert.ok(symbol?.includes('stroke-linecap="inherit"'))
    assert.ok(symbol?.includes('stroke-linejoin="inherit"'))
  }
  assert.ok(customSymbol?.includes('fill="none"'))
  assert.ok(customSymbol?.includes('stroke="currentColor"'))
  assert.ok(customSymbol?.includes('stroke-width="2"'))
  assert.ok(output.includes('aria-hidden="true"'))
})

test("nested sprite paths stay under the configured consumer output directory", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.js":
      'export default { OUTPUT_DIR: "static", SPRITE_PATH: "/assets/icons/site.svg", CUSTOM_SVG_DIR: "logos" };',
    "src/index.js": "export const value = 1;",
    "static/logos/only-custom.svg": svg,
  })
  const result = await buildSpriteSheet(root)
  assert.equal(result.outputFile, path.join(root, "static/assets/icons/site.svg"))
  assert.deepEqual(symbolIds(result.outputFile), ["only-custom"])
})

test("custom collisions fail the API and CLI before replacing the previous sprite", async (t) => {
  const root = createProject(t, {
    "src/icon.tsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icon = <Check/>;',
    "public/zero-ui-icons/check.svg": svg,
    "public/icons.svg": "previous sprite",
  })
  await assert.rejects(
    buildSpriteSheet(root),
    (error) =>
      error instanceof Error &&
      error.message.includes('Duplicate sprite ID "check"') &&
      error.message.includes("lucide") &&
      error.message.includes("zero-ui-icons")
  )
  const cliResult = spawnSync(process.execPath, [cli], { cwd: root, encoding: "utf8" })
  assert.equal(cliResult.status, 1)
  assert.ok(cliResult.stderr.includes("Rename the custom SVG"))
  assert.equal(fs.readFileSync(path.join(root, "public/icons.svg"), "utf8"), "previous sprite")
})

test("custom roots retain authored presentation, metadata, and namespaces", async (t) => {
  const custom =
    '<svg id="original" width="500" height="500" viewBox="0 0 24 24" class="artwork" opacity="0.4" fill-rule="evenodd" color="blue" fill="red" stroke="inherit" data-kind="logo" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="green" d="M0 0h10v10z"/></svg>'
  const root = createProject(t, {
    "src/index.js": "",
    "public/zero-ui-icons/artwork.svg": custom,
  })
  const result = await buildSpriteSheet(root)
  const output = fs.readFileSync(result.outputFile, "utf8")
  for (const attribute of [
    'id="artwork"',
    'class="artwork"',
    'opacity="0.4"',
    'fill-rule="evenodd"',
    'color="blue"',
    'fill="red"',
    'stroke="inherit"',
    'data-kind="logo"',
    'xmlns:xlink="http://www.w3.org/1999/xlink"',
    'fill="green"',
  ]) {
    assert.ok(output.includes(attribute), attribute)
  }
  assert.ok(!output.includes('id="original"'))
  assert.ok(!output.includes('width="500"'))
  assert.ok(!output.includes('height="500"'))
  assert.equal(fs.readFileSync(path.join(root, "public/zero-ui-icons/artwork.svg"), "utf8"), custom)
})

test("namespace imports fail a complete build and preserve the existing sprite", async (t) => {
  const root = createProject(t, {
    "src/view.tsx":
      'import * as Icons from "@react-zero-ui/icon-sprite"; const { Check } = Icons; export const icon = <Check/>;',
    "public/icons.svg": "previous sprite",
  })
  await assert.rejects(buildSpriteSheet(root), namespaceImportError)
  const cliResult = spawnSync(process.execPath, [cli], { cwd: root, encoding: "utf8" })
  assert.equal(cliResult.status, 1)
  assert.ok(cliResult.stderr.includes("named imports"))
  assert.equal(fs.readFileSync(path.join(root, "public/icons.svg"), "utf8"), "previous sprite")
})

test("custom serialization preserves nested SVG viewports and local definitions", async (t) => {
  const nested =
    '<svg viewBox="0 0 24 24"><defs><linearGradient id="paint"><stop stop-color="red"/></linearGradient></defs><svg x="4" y="4" width="8" height="8" viewBox="0 0 10 10"><path fill="url(#paint)" d="M0 0h10v10z"/></svg></svg>'
  const root = createProject(t, {
    "src/index.js": "",
    "public/zero-ui-icons/nested.svg": nested,
    "public/zero-ui-icons/second.svg": svg,
  })
  const result = await buildSpriteSheet(root)
  const output = fs.readFileSync(result.outputFile, "utf8")
  assert.match(output, nestedCustomSvgPattern)
  assert.match(output, localCustomDefsPattern)
  assert.deepEqual(symbolIds(result.outputFile), ["nested", "second"])
})

test("repeated and concurrent consumers stay isolated and rescan changed sources", async (t) => {
  const cwd = process.cwd()
  const first = createProject(t, {
    "zero-ui.config.js": String.raw`import fs from "node:fs";
			fs.appendFileSync(new URL("./config-loads", import.meta.url), "loaded\n");
			export default { ROOT_DIR: "app" };`,
    "app/icon.js":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icons = [Check];',
  })
  const second = createProject(t, {
    "zero-ui.config.js": 'export default { OUTPUT_DIR: "static", SPRITE_PATH: "/other.svg" };',
    "src/icon.js":
      'import { Heart } from "@react-zero-ui/icon-sprite"; export const icons = [Heart];',
  })
  const [a, b] = await Promise.all([buildSpriteSheet(first), buildSpriteSheet(second)])
  assert.deepEqual(symbolIds(a.outputFile), ["check"])
  assert.deepEqual(symbolIds(b.outputFile), ["heart"])
  assert.equal(fs.readFileSync(path.join(first, "config-loads"), "utf8"), "loaded\n")
  writeProject(first, {
    "app/icon.js":
      'import { Star } from "@react-zero-ui/icon-sprite"; export const icons = [Star];',
  })
  const repeat = await buildSpriteSheet(first)
  assert.deepEqual(symbolIds(repeat.outputFile), ["star"])
  assert.deepEqual(symbolIds(b.outputFile), ["heart"])
  assert.equal(process.cwd(), cwd)
})

test("missing icons remain warning-only, including static custom names", async (t) => {
  const root = createProject(t, {
    "src/view.jsx": `import { UnknownIcon, CustomIcon, Check } from "@react-zero-ui/icon-sprite";
			export const icons = <><UnknownIcon/><CustomIcon name="missing-logo"/><Check/></>;`,
  })
  const result = await buildSpriteSheet(root)
  assert.deepEqual(symbolIds(result.outputFile), ["check"])
  assert.equal(result.warnings.length, 2)
  assert.ok(result.warnings[0].includes("Missing icon: UnknownIcon"))
  assert.ok(result.warnings[1].includes("Missing custom icon: missing-logo"))
  const run = spawnSync(process.execPath, [cli], { cwd: root, encoding: "utf8" })
  assert.equal(run.status, 0, run.stderr)
  assert.ok(run.stderr.includes("Missing icon: UnknownIcon"))
  assert.ok(run.stdout.includes("with 1 icons"))
})

test("custom SVG symlinks are bundled even without source references", async (t) => {
  const root = createProject(t, { "src/index.js": "", "assets/logo.svg": svg })
  fs.mkdirSync(path.join(root, "public/zero-ui-icons"), { recursive: true })
  fs.symlinkSync(
    path.join(root, "assets/logo.svg"),
    path.join(root, "public/zero-ui-icons/linked.svg")
  )
  const result = await buildSpriteSheet(root)
  assert.deepEqual(symbolIds(result.outputFile), ["linked"])
  assert.deepEqual(result.warnings, [])
})

test("an empty source tree produces an empty sprite, not stale icons", async (t) => {
  const root = createProject(t, { "src/index.js": "", "public/icons.svg": "old output" })
  const result = await buildSpriteSheet(root)
  assert.equal(result.iconCount, 0)
  assert.deepEqual(symbolIds(result.outputFile), [])
  assert.deepEqual(result.warnings, [])
})

test("parse and SVG failures do not replace an existing output", async (t) => {
  const cases = [
    { "src/view.jsx": "export const broken = <;" },
    {
      "src/view.jsx":
        'import { Icon } from "@react-zero-ui/icon-sprite"; export const icon = <Icon name={props.name}/>;',
    },
    { "src/view.js": "", "public/zero-ui-icons/broken.svg": "<html/>" },
  ]
  await Promise.all(
    cases.map(async (files) => {
      const root = createProject(t, { ...files, "public/icons.svg": "previous sprite" })
      await assert.rejects(buildSpriteSheet(root))
      assert.equal(fs.readFileSync(path.join(root, "public/icons.svg"), "utf8"), "previous sprite")
      assert.deepEqual(
        fs.readdirSync(path.join(root, "public")).filter((name) => name.endsWith(".tmp")),
        []
      )
    })
  )
})

test("write failures clean up the temporary output and preserve the existing target", async (t) => {
  const root = createProject(t, {
    "src/index.js": "",
    "public/icons.svg/keep": "existing directory",
  })
  await assert.rejects(buildSpriteSheet(root))
  assert.equal(
    fs.readFileSync(path.join(root, "public/icons.svg/keep"), "utf8"),
    "existing directory"
  )
  assert.deepEqual(fs.readdirSync(path.join(root, "public")), ["icons.svg"])
})

test("imports do not load consumer configuration or generate output", (t) => {
  const root = createProject(t, {
    "zero-ui.config.js":
      'import fs from "node:fs"; fs.writeFileSync(new URL("./loaded", import.meta.url), "unexpected"); export default {};',
  })
  const modules = [
    "../dist/command.js",
    "../dist/build.js",
    "../dist/build/resolve-build-config.js",
  ].map((relative) => new URL(relative, import.meta.url).href)
  const script = modules.map((url) => `await import(${JSON.stringify(url)});`).join("\n")
  assert.equal(
    execFileSync(process.execPath, ["--input-type=module", "--eval", script], {
      cwd: root,
      encoding: "utf8",
    }),
    ""
  )
  assert.deepEqual(fs.readdirSync(root).sort(compareText), ["package.json", "zero-ui.config.js"])
})

test("the CLI runs through a bin symlink and reports failures with a nonzero exit", (t) => {
  const root = createProject(t, {
    "src/view.jsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icon = <Check opacity={0.5}/>;',
  })
  const bin = path.join(root, "zero-icons")
  fs.symlinkSync(cli, bin)
  if (process.platform !== "win32") {
    fs.accessSync(cli, fs.constants.X_OK)
  }
  const invoke = () =>
    process.platform === "win32"
      ? spawnSync(process.execPath, [bin], { cwd: root, encoding: "utf8" })
      : spawnSync(bin, [], { cwd: root, encoding: "utf8" })
  const success = invoke()
  assert.equal(success.status, 0, success.stderr)
  assert.ok(success.stdout.includes("with 1 icons"))
  assert.ok(success.stderr.includes('view.jsx:1: <Check> prop "opacity"'))
  writeProject(root, { "src/view.jsx": "export const broken = <;" })
  const failure = invoke()
  assert.equal(failure.status, 1)
  assert.ok(failure.stderr.includes("zero-icons:"))
  assert.ok(failure.stderr.includes("view.jsx"))
  assert.ok(!failure.stdout.includes("Built"))
  assert.deepEqual(symbolIds(path.join(root, "public/icons.svg")), ["check"])
})
