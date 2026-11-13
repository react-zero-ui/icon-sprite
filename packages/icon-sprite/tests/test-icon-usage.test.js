import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { resolveSpriteBuildConfig } from "../dist/build/resolve-build-config.js"
import { scanIconUsage } from "../dist/build/scan-icon-usage.js"
import { createProject } from "./cli-fixtures.js"

const customSourceError = /CustomIcon.*src/
const inlineSourceError = /CustomIcon src.*inline string literal/
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
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, [
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
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, [])
})

test("binding identity handles shadowed components and usage before imports", async (t) => {
  const root = createProject(t, {
    "src/view.jsx": `export const icon = <Tick/>;
			import { Check as Tick, Heart } from "@react-zero-ui/icon-sprite";
			function Local(Heart) { return <Heart fill="red"/>; }`,
  })
  const result = scanIconUsage((await resolveSpriteBuildConfig(root)).scan)
  assert.deepEqual(result.icons, ["Check"])
  assert.deepEqual(result.warnings, [])
})

test("generic names resolve constants while CustomIcon aliases use inline sources", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import { Icon as Glyph, CustomIcon as Custom, Heart } from "@react-zero-ui/icon-sprite";
      const name = "Check";
      export const view = <><Glyph name={name}/><Custom src="/brand/logo.svg"/><Custom src={"/icons/second.svg"}/><Heart name="not-an-icon"/></>;`,
  })
  const result = scanIconUsage((await resolveSpriteBuildConfig(root)).scan)
  assert.deepEqual(result.icons, ["Check", "Heart"])
  assert.deepEqual(result.customSources, ["/brand/logo.svg", "/icons/second.svg"])
})

test("CustomIcon requires an inline public SVG source after JSX spread precedence", async (t) => {
  const valid = createProject(t, {
    "src/view.tsx": `import { CustomIcon as Logo } from "@react-zero-ui/icon-sprite";
      export const view = <><Logo {...props} src="/brand/logo.svg"/><Logo src="/icons/second.svg"/></>;`,
  })
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(valid)).scan).customSources, [
    "/brand/logo.svg",
    "/icons/second.svg",
  ])
  const invalid = [
    "<CustomIcon src={props.src}/>",
    '<CustomIcon src="/icons/icon.svg" {...props}/>',
    '<CustomIcon name="logo"/>',
    "<CustomIcon/>",
    '<CustomIcon src="relative/logo.svg"/>',
    '<CustomIcon src="https://example.com/logo.svg"/>',
    '<CustomIcon src="//example.com/logo.svg"/>',
    '<CustomIcon src="/brand/../logo.svg"/>',
    '<CustomIcon src="/brand/logo.svg?version=1"/>',
    '<CustomIcon src="/brand/logo.png"/>',
    '<CustomIcon src="/brand/%6cogo.svg"/>',
  ]
  await Promise.all(
    invalid.map(async (jsx) => {
      const root = createProject(t, {
        "src/view.tsx": `import { CustomIcon } from "@react-zero-ui/icon-sprite";
        export const view = ${jsx};`,
      })
      const scan = (await resolveSpriteBuildConfig(root)).scan
      assert.throws(() => scanIconUsage(scan), customSourceError)
    })
  )
})

test("custom sources accept explicit closing tags and aliases without duplicate discovery", async (t) => {
  const root = createProject(t, {
    "src/view.tsx": `import { CustomIcon, CustomIcon as Logo } from "@react-zero-ui/icon-sprite";
      export const view = <>
        <CustomIcon src="/brand/logo.svg"></CustomIcon>
        <CustomIcon src="/brand/logo.svg"/>
        <Logo src={"/brand/second.svg"}></Logo>
      </>;`,
  })
  const result = scanIconUsage((await resolveSpriteBuildConfig(root)).scan)
  assert.deepEqual(result.customSources, ["/brand/logo.svg", "/brand/second.svg"])
  assert.deepEqual(result.warnings, [])
})

test("custom sources reject variables and expressions even when their values are constant", async (t) => {
  const expressions = [
    "source",
    "assertedSource",
    "satisfiedSource",
    "importedSource",
    '"/brand/" + "logo.svg"',
    "`/brand/logo.svg`",
    '"/brand/logo.svg" as const',
    '"/brand/logo.svg" satisfies string',
    "source!",
    "getSource()",
    'true ? "/brand/logo.svg" : "/brand/second.svg"',
    "({ src: '/brand/logo.svg' }).src",
  ]
  await Promise.all(
    expressions.map(async (expression) => {
      const root = createProject(t, {
        "src/view.tsx": `import { CustomIcon } from "@react-zero-ui/icon-sprite";
          import importedSource from "./logo.svg";
          const source = "/brand/logo.svg";
          const assertedSource = "/brand/logo.svg" as const;
          const satisfiedSource = "/brand/logo.svg" satisfies string;
          const getSource = () => "/brand/logo.svg";
          export const view = <CustomIcon src={${expression}}/>;`,
      })
      const scan = (await resolveSpriteBuildConfig(root)).scan
      assert.throws(() => scanIconUsage(scan), inlineSourceError, expression)
    })
  )
})

test("namespace icon imports fail for members, destructuring, dynamic access, and unused imports", async (t) => {
  const cases = [
    "export const icon = <Icons.Check/>;",
    'export const icon = Icons["Check"];',
    "const { Check } = Icons; export const icon = <Check/>;",
    "export const icon = Icons[name];",
    "",
  ]
  await Promise.all(
    cases.map(async (usage) => {
      const root = createProject(t, {
        "src/view.tsx": `import * as Icons from "@react-zero-ui/icon-sprite";\n${usage}`,
      })
      const project = await resolveSpriteBuildConfig(root)
      assert.throws(
        () => scanIconUsage(project.scan),
        (error) =>
          error instanceof Error &&
          error.message.includes("view.tsx:1") &&
          error.message.includes("Namespace icon imports") &&
          error.message.includes("named imports")
      )
    })
  )
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
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, [
    "Check",
    "Heart",
  ])
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
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, ["Check"])
})

test("consumer Babel configuration is neither loaded nor executed", async (t) => {
  const root = createProject(t, {
    "babel.config.js": 'throw new Error("Do not execute consumer Babel config");',
    ".babelrc": '{"plugins":["does-not-exist"]}',
    "src/view.jsx":
      'import { Check } from "@react-zero-ui/icon-sprite"; export const icon = <Check/>;',
  })
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, ["Check"])
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
  assert.deepEqual(scanIconUsage((await resolveSpriteBuildConfig(root)).scan).icons, [
    "Check",
    "Heart",
  ])
})

test("risky prop diagnostics identify the source line and imported component", async (t) => {
  const root = createProject(t, {
    "src/view.jsx":
      'import { Heart as Favorite } from "@react-zero-ui/icon-sprite";\nexport const icon = <Favorite stroke="red" opacity={0.5} strokeWidth={3}/>;',
  })
  const { warnings } = scanIconUsage((await resolveSpriteBuildConfig(root)).scan)
  assert.equal(warnings.length, 1)
  assert.ok(warnings[0].replaceAll("\\", "/").includes('src/view.jsx:2: <Heart> prop "opacity"'))
})

test("unknown generic names and overriding spreads fail with actionable locations", async (t) => {
  const roots = ["name={props.name}", 'name="Check" {...props}', ""].map((attributes) =>
    createProject(t, {
      "src/view.jsx": `import { Icon } from "@react-zero-ui/icon-sprite";\nexport const icon = <Icon ${attributes}/>;`,
    })
  )
  const scans = await Promise.all(
    roots.map(async (root) => (await resolveSpriteBuildConfig(root)).scan)
  )
  for (const scan of scans) {
    assert.throws(
      () => scanIconUsage(scan),
      (error) =>
        error instanceof Error &&
        error.message.includes("view.jsx:2: Unable to statically evaluate") &&
        error.message.includes("string literal")
    )
  }
})

test("type-only namespaces and namespaces from unrelated packages remain outside runtime discovery", async (t) => {
  const root = createProject(t, {
    "src/types.ts": `import type * as Icons from "@react-zero-ui/icon-sprite";
      import * as Other from "another-package";
      export type Props = Icons.IconProps;
      export const value = Other.value;`,
  })
  const result = scanIconUsage((await resolveSpriteBuildConfig(root)).scan)
  assert.deepEqual(result.icons, [])
  assert.deepEqual(result.warnings, [])
})

test("parse errors and missing scan roots are failures with source paths", async (t) => {
  const broken = createProject(t, { "src/broken.tsx": "export const view = <;" })
  const absent = createProject(t)
  const [brokenProject, absentProject] = await Promise.all([
    resolveSpriteBuildConfig(broken),
    resolveSpriteBuildConfig(absent),
  ])
  assert.throws(
    () => scanIconUsage(brokenProject.scan),
    (error) => error instanceof Error && error.message.includes("broken.tsx")
  )
  assert.throws(
    () => scanIconUsage(absentProject.scan),
    (error) => error instanceof Error && error.message.includes("src")
  )
})
