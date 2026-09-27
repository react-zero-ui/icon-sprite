import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { resolveProject } from "../dist/build/project.js"
import { scanIcons } from "../dist/build/source-scanner.js"
import { createProject } from "./cli-fixtures.js"

test("scanner finds used aliases in all four source extensions, not unused imports", async (t) => {
  const root = createProject(t, {
    "src/a.ts":
      'import { Check as Tick, Unused } from "@react-zero-ui/icon-sprite"; export const icons = [Tick];',
    "src/b.js":
      'import { Heart } from "@react-zero-ui/icon-sprite"; export const icons = { Heart };',
    "src/c.tsx":
      'import { Star as Favorite } from "@react-zero-ui/icon-sprite"; export const icon = <Favorite/>;',
    "src/d.jsx": 'import { Home } from "@react-zero-ui/icon-sprite"; export const icon = <Home/>;',
  })
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, [
    "Check",
    "Heart",
    "Home",
    "Star",
  ])
})

test("type-only imports, type references, and type re-exports do not add icons", async (t) => {
  const root = createProject(t, {
    "src/types.ts": `import type { Home } from "@react-zero-ui/icon-sprite";
			import { type IconProps, Heart, Check, Star } from "@react-zero-ui/icon-sprite";
			export type H = typeof Heart;
			export type { Check };
			export { type Star };
			export type P = IconProps;`,
  })
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, [])
})

test("binding identity handles shadowed components and usage before imports", async (t) => {
  const root = createProject(t, {
    "src/view.jsx": `export const icon = <Tick/>;
			import { Check as Tick, Heart } from "@react-zero-ui/icon-sprite";
			function Local(Heart) { return <Heart fill="red"/>; }`,
  })
  const result = scanIcons((await resolveProject(root)).scan)
  assert.deepEqual(result.icons, ["Check"])
  assert.deepEqual(result.warnings, [])
})

test("generic and CustomIcon aliases support static names without treating wrapper props as names", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import { Icon as Glyph, CustomIcon as Custom, Heart } from "@react-zero-ui/icon-sprite";
			const name = "Check";
			export const view = <><Glyph name={name}/><Custom name={"my-logo"}/><Custom name={props.name}/><Heart name="not-an-icon"/></>;`,
  })
  const result = scanIcons((await resolveProject(root)).scan)
  assert.deepEqual(result.icons, ["Check", "Heart"])
  assert.deepEqual(result.customIcons, ["my-logo"])
})

test("static namespace members work in JSX and value references", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import * as Icons from "@react-zero-ui/icon-sprite";
			export const list = [Icons.Heart, Icons["Home"]];
			export const view = <><Icons.Check/><Icons.CustomIcon name="logo"/><Icons.Icon name="Star"/></>;`,
  })
  const result = scanIcons((await resolveProject(root)).scan)
  assert.deepEqual(result.icons, ["Check", "Heart", "Home", "Star"])
  assert.deepEqual(result.customIcons, ["logo"])
})

test("exclusion skips matching directory basenames recursively before parsing", async (t) => {
  const root = createProject(t, {
    "src/view.jsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icon = <Check/>;',
    "src/node_modules/bad.jsx": "this is not valid JSX!",
    "src/nested/dist/bad.ts": "this is not valid TypeScript!",
    "src/build/bad.js": "this is not valid JavaScript!",
    "src/distinct/keep.jsx":
      'import { Heart } from "@react-zero-ui/icon-sprite"; export const icon = <Heart/>;',
  })
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, ["Check", "Heart"])
})

test("custom root, import name, ignored icons, and exclusion overrides apply together", async (t) => {
  const root = createProject(t, {
    "zero-ui.config.js":
      'export default { ROOT_DIR: "app", IMPORT_NAME: "local-icons", IGNORE_ICONS: ["Heart"], EXCLUDE_DIRS: ["vendor"] };',
    "src/bad.ts": "not parsed!",
    "app/vendor/bad.js": "not parsed!",
    "app/index.jsx": `import { Check, Heart } from "local-icons";
			import { Home } from "another-package";
			export const icons = <><Check/><Heart/><Home/></>;`,
  })
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, ["Check"])
})

test("consumer Babel configuration is neither loaded nor executed", async (t) => {
  const root = createProject(t, {
    "babel.config.js": 'throw new Error("Do not execute consumer Babel config");',
    ".babelrc": '{"plugins":["does-not-exist"]}',
    "src/view.jsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icon = <Check/>;',
  })
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, ["Check"])
})

test("linked sources are scanned without revisiting directory cycles", async (t) => {
  const root = createProject(t, { "src/view.js": "export const value = 1;" })
  const shared = createProject(t, {
    "icons/view.jsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const view = <Check/>;',
    "other.js": 'import { Heart } from "@react-zero-ui/icon-sprite"; export const icons = [Heart];',
  })
  fs.symlinkSync(path.join(root, "src"), path.join(root, "src/loop"), "dir")
  fs.symlinkSync(path.join(shared, "icons"), path.join(root, "src/linked"), "dir")
  fs.symlinkSync(path.join(shared, "other.js"), path.join(root, "src/other.js"))
  assert.deepEqual(scanIcons((await resolveProject(root)).scan).icons, ["Check", "Heart"])
})

test("risky prop diagnostics identify the source line and imported component", async (t) => {
  const root = createProject(t, {
    "src/view.jsx":
      'import { Heart as Favorite } from "@react-zero-ui/icon-sprite";\nexport const icon = <Favorite stroke="red" opacity={0.5} strokeWidth={3}/>;',
  })
  const { warnings } = scanIcons((await resolveProject(root)).scan)
  assert.equal(warnings.length, 2)
  assert.ok(warnings[0].replaceAll("\\", "/").includes('src/view.jsx:2: <Heart> prop "stroke"'))
  assert.ok(warnings[1].includes('"opacity"'))
})

test("unknown generic names and overriding spreads fail with actionable locations", async (t) => {
  const roots = ["name={props.name}", 'name="Check" {...props}', ""].map((attributes) =>
    createProject(t, {
      "src/view.jsx": `import { Icon } from "@react-zero-ui/icon-sprite";\nexport const icon = <Icon ${attributes}/>;`,
    })
  )
  const scans = await Promise.all(roots.map(async (root) => (await resolveProject(root)).scan))
  for (const scan of scans) {
    assert.throws(
      () => scanIcons(scan),
      (error) =>
        error instanceof Error &&
        error.message.includes("view.jsx:2: Unable to statically evaluate") &&
        error.message.includes("string literal")
    )
  }
})

test("dynamic namespace access warns instead of silently claiming complete coverage", async (t) => {
  const root = createProject(t, {
    "src/list.ts":
      'import * as Icons from "@react-zero-ui/icon-sprite"; export const icon = Icons[name];',
  })
  assert.ok(
    scanIcons((await resolveProject(root)).scan).warnings[0].includes(
      "Dynamic icon namespace access"
    )
  )
})

test("parse errors and missing scan roots are failures with source paths", async (t) => {
  const broken = createProject(t, { "src/broken.tsx": "export const view = <;" })
  const absent = createProject(t)
  const [brokenProject, absentProject] = await Promise.all([
    resolveProject(broken),
    resolveProject(absent),
  ])
  assert.throws(
    () => scanIcons(brokenProject.scan),
    (error) => error instanceof Error && error.message.includes("broken.tsx")
  )
  assert.throws(
    () => scanIcons(absentProject.scan),
    (error) => error instanceof Error && error.message.includes("src")
  )
})
