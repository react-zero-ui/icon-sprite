import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const mapping = JSON.parse(
  readFileSync(new URL("../generated/component-sprite-map.json", import.meta.url), "utf8")
)
const renderUsePattern = /return renderUse\("([^"]+)", SPRITE_PATH, props\);/

test("all wrappers use their mapped sprite IDs and the shared renderer without any casts", () => {
  assert.ok(Object.keys(mapping).length > 0)
  for (const [name, { spriteId }] of Object.entries(mapping)) {
    const source = readFileSync(new URL(`../src/icons/${name}.tsx`, import.meta.url), "utf8")
    assert.equal(source.match(renderUsePattern)?.[1], spriteId, name)
    assert.ok(source.includes('from "../render-use.js"'), name)
    assert.ok(source.includes('if (process.env.NODE_ENV !== "production")'))
    assert.ok(!source.includes("as any"))
  }
})

test("compiled Lucide and Tabler wrappers preserve production props and development dimensions", async (t) => {
  const previousEnvironment = process.env.NODE_ENV
  t.after(() => {
    if (previousEnvironment === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previousEnvironment
    }
  })
  const names = ["ArrowDownAZ", "IconAB2"]
  const modules = await Promise.all(names.map((name) => import(`../dist/icons/${name}.js`)))
  for (const [index, name] of names.entries()) {
    const Icon = modules[index][name]
    const onClick = t.mock.fn()
    const props = { size: 32, width: 40, height: 0, "aria-label": "example", onClick }
    process.env.NODE_ENV = "production"
    const production = Icon(props)
    assert.equal(production.type, "svg")
    assert.equal(production.props.width, 40)
    assert.equal(production.props.height, 0)
    assert.equal(production.props["aria-label"], "example")
    assert.equal(production.props.onClick, onClick)
    assert.equal(production.props.children.props.href, `/icons.svg#${mapping[name].spriteId}`)
    for (const environment of ["development", "test"]) {
      process.env.NODE_ENV = environment
      const element = Icon(props)
      assert.notEqual(element.type, "svg")
      assert.deepEqual(element.props, props)
      assert.deepEqual(Icon({ width: null, height: undefined }).props, { size: 24 })
      assert.equal(Icon({ size: 0 }).props.size, 0)
    }
  }
})

test("compiled local Lucide development SVGs retain geometry and dimension overrides", async () => {
  const { ArrowDown01 } = await import("../dist/lucide-archive/ArrowDown01.js")
  const element = ArrowDown01({ size: 32, width: 40, strokeWidth: 3, "aria-label": "Sort" })
  assert.equal(element.type, "svg")
  assert.equal(element.props.width, 40)
  assert.equal(element.props.height, 32)
  assert.equal(element.props.strokeWidth, 3)
  assert.equal(element.props.strokeLinecap, "round")
  assert.equal(element.props.className, "lucide lucide-arrow-down-0-1")
  assert.equal(element.props.viewBox, "0 0 24 24")
  assert.equal(element.props["aria-label"], "Sort")
  assert.equal(element.props.children[0].type, "path")
  assert.equal(element.props.children[0].props.d, "m3 16 4 4 4-4")
  assert.equal(ArrowDown01({}).props.width, 24)
  assert.equal(ArrowDown01({ size: 0 }).props.height, 0)
})

test("renamed Tabler icons retain published export names and sprite IDs", async () => {
  const expected = {
    IconBrandAdobeAfterEffect: "tabler-brand-adobe-after-effect",
    IconBrandKakoTalk: "tabler-brand-kako-talk",
    IconCurrencyRubel: "tabler-currency-rubel",
    IconGenderTrasvesti: "tabler-gender-trasvesti",
    IconIkosaedr: "tabler-ikosaedr",
    IconMoodConfuzed: "tabler-mood-confuzed",
    IconPhysotherapist: "tabler-physotherapist",
    IconSportBillard: "tabler-sport-billard",
  }
  const entries = Object.entries(expected)
  const modules = await Promise.all(entries.map(([name]) => import(`../dist/icons/${name}.js`)))
  for (const [index, [name, id]] of entries.entries()) {
    assert.equal(mapping[name]?.spriteId, id)
    assert.equal(typeof modules[index][name], "function")
  }
})
