import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const mapping = JSON.parse(readFileSync(new URL("../assets/catalog.json", import.meta.url), "utf8"))
test("every public icon renders the catalog's production symbol", async (t) => {
  const previousEnvironment = process.env.NODE_ENV
  t.after(() => {
    if (previousEnvironment === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previousEnvironment
    }
  })
  process.env.NODE_ENV = "production"
  const api = await import("../dist/index.js")
  assert.ok(Object.keys(mapping).length > 0)
  for (const [name, { spriteId }] of Object.entries(mapping)) {
    const element = api[name]({ size: 0 })
    assert.equal(element.type, "svg", name)
    assert.equal(element.props.children.props.href, `/icons.svg#${spriteId}`, name)
    assert.equal(element.props.width, 0, name)
  }
})

test("compiled React icon wrappers preserve production props and development dimensions", async (t) => {
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
    assert.equal(production.props.strokeWidth, "2")
    assert.equal(production.props.children.props.href, `/icons.svg#${mapping[name].spriteId}`)
    assert.equal(Icon({ strokeWidth: 4 }).props.strokeWidth, 4)
    for (const environment of ["development", "test"]) {
      process.env.NODE_ENV = environment
      const element = Icon(props)
      assert.notEqual(element.type, "svg")
      assert.deepEqual(element.props, props)
      const defaultElement = Icon({ width: null, height: undefined })
      const defaultSvg = defaultElement.type(defaultElement.props)
      assert.equal(defaultSvg.props.width, 24)
      assert.equal(defaultSvg.props.height, 24)
      const zeroElement = Icon({ size: 0 })
      const zeroSvg = zeroElement.type(zeroElement.props)
      assert.equal(zeroSvg.props.width, 0)
      assert.equal(zeroSvg.props.height, 0)
    }
  }
})

test("compiled local development SVGs retain geometry and dimension overrides", async (t) => {
  const previousEnvironment = process.env.NODE_ENV
  t.after(() => {
    if (previousEnvironment === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previousEnvironment
    }
  })
  process.env.NODE_ENV = "development"
  const { ArrowDown01 } = await import("../dist/icons/ArrowDown01.js")
  const wrapper = ArrowDown01({ size: 32, width: 40, strokeWidth: 3, "aria-label": "Sort" })
  const element = wrapper.type(wrapper.props)
  assert.equal(element.type, "svg")
  assert.equal(element.props.width, 40)
  assert.equal(element.props.height, 32)
  assert.equal(element.props.strokeWidth, 3)
  assert.equal(element.props.strokeLinecap, "round")
  assert.equal(element.props.className, "lucide lucide-arrow-down-01")
  assert.equal(element.props.viewBox, "0 0 24 24")
  assert.equal(element.props["aria-label"], "Sort")
  assert.equal(element.props.children[0].type, "path")
  assert.equal(element.props.children[0].props.d, "m3 16 4 4 4-4")
  const defaultSvg = ArrowDown01({})
  assert.equal(defaultSvg.type(defaultSvg.props).props.width, 24)
  const zeroSvg = ArrowDown01({ size: 0 })
  assert.equal(zeroSvg.type(zeroSvg.props).props.height, 0)
})

test("built-in presentation props match between development and production", async (t) => {
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
  const cases = [
    {},
    {
      color: "blue",
      fill: "red",
      stroke: "green",
      strokeWidth: 4,
      strokeLinecap: "square",
      strokeLinejoin: "bevel",
    },
    {
      fill: null,
      stroke: undefined,
      strokeWidth: undefined,
      strokeLinecap: undefined,
      strokeLinejoin: undefined,
    },
    { color: "blue", stroke: "red" },
  ]
  const props = ["color", "fill", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin"]
  for (const [index, name] of names.entries()) {
    const Icon = modules[index][name]
    for (const iconProps of cases) {
      process.env.NODE_ENV = "development"
      const wrapper = Icon(iconProps)
      const development = wrapper.type(wrapper.props)
      process.env.NODE_ENV = "production"
      const production = Icon(iconProps)
      for (const prop of props) {
        assert.equal(production.props[prop], development.props[prop], `${name} ${prop}`)
      }
    }
  }
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
