import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { generateSprite } from "@react-zero-ui/icon-sprite/build"
import { createProject, svg, writeProject } from "./cli-fixtures.js"

const cli = fileURLToPath(new URL("../dist/command.js", import.meta.url))
const compareText = (left, right) => left.localeCompare(right)
const symbolIdPattern = /<symbol\b[^>]*\bid="([^"]+)"/g

function symbolIds(file) {
  return [...fs.readFileSync(file, "utf8").matchAll(symbolIdPattern)]
    .map((match) => match[1])
    .sort(compareText)
}

test("the public build API returns config diagnostics without console side effects", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.ts": "export default { invalid",
    "src/view.js": "export const value = 1;",
  })
  const log = t.mock.method(console, "log", () => undefined)
  const warn = t.mock.method(console, "warn", () => undefined)
  const result = await generateSprite(root)
  assert.equal(result.iconCount, 0)
  assert.equal(result.outputFile, path.join(root, "public/icons.svg"))
  assert.equal(result.warnings.length, 1)
  assert.ok(result.warnings[0].includes("zero-ui.config.ts"))
  assert.equal(log.mock.callCount(), 0)
  assert.equal(warn.mock.callCount(), 0)
})

test("sprite contains both packs and every custom SVG, with attributes and CSS stroke width", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import { Check, IconCheck, CustomIcon, MyLogo } from "@react-zero-ui/icon-sprite";
			export const icons = <><Check/><Check/><IconCheck/><CustomIcon name="CaseSensitive"/><MyLogo/></>;`,
    "public/zero-ui-icons/my-logo.svg": svg,
    "public/zero-ui-icons/CaseSensitive.svg": svg,
    "public/zero-ui-icons/unused.svg": svg,
    "public/zero-ui-icons/notes.txt": "not an SVG",
  })
  const result = await generateSprite(root)
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
  assert.ok(output.includes('stroke-width="var(--icon-stroke-width, 2)"'))
  assert.ok(output.includes('aria-hidden="true"'))
})

test("nested sprite paths stay under the configured consumer output directory", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.js":
      'export default { OUTPUT_DIR: "static", SPRITE_PATH: "/assets/icons/site.svg", CUSTOM_SVG_DIR: "logos" };',
    "src/index.js": "export const value = 1;",
    "static/logos/only-custom.svg": svg,
  })
  const result = await generateSprite(root)
  assert.equal(result.outputFile, path.join(root, "static/assets/icons/site.svg"))
  assert.deepEqual(symbolIds(result.outputFile), ["only-custom"])
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
  const [a, b] = await Promise.all([generateSprite(first), generateSprite(second)])
  assert.deepEqual(symbolIds(a.outputFile), ["check"])
  assert.deepEqual(symbolIds(b.outputFile), ["heart"])
  assert.equal(fs.readFileSync(path.join(first, "config-loads"), "utf8"), "loaded\n")
  writeProject(first, {
    "app/icon.js":
      'import { Star } from "@react-zero-ui/icon-sprite"; export const icons = [Star];',
  })
  const repeat = await generateSprite(first)
  assert.deepEqual(symbolIds(repeat.outputFile), ["star"])
  assert.deepEqual(symbolIds(b.outputFile), ["heart"])
  assert.equal(process.cwd(), cwd)
})

test("missing icons remain warning-only, including static custom names", async (t) => {
  const root = createProject(t, {
    "src/view.jsx": `import { UnknownIcon, CustomIcon, Check } from "@react-zero-ui/icon-sprite";
			export const icons = <><UnknownIcon/><CustomIcon name="missing-logo"/><Check/></>;`,
  })
  const result = await generateSprite(root)
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
  const result = await generateSprite(root)
  assert.deepEqual(symbolIds(result.outputFile), ["linked"])
  assert.deepEqual(result.warnings, [])
})

test("an empty source tree produces an empty sprite, not stale icons", async (t) => {
  const root = createProject(t, { "src/index.js": "", "public/icons.svg": "old output" })
  const result = await generateSprite(root)
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
      await assert.rejects(generateSprite(root))
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
  await assert.rejects(generateSprite(root))
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
  const modules = ["../dist/command.js", "../dist/build.js", "../dist/build/project.js"].map(
    (relative) => new URL(relative, import.meta.url).href
  )
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
