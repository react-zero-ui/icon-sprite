import assert from "node:assert/strict"
import test from "node:test"
import { iconDimensions, renderIcon, renderInline } from "../dist/runtime/icon.js"

test("all renderers share dimension precedence, including explicit zero", () => {
  assert.deepEqual(iconDimensions({}), { width: 24, height: 24 })
  assert.deepEqual(iconDimensions({ size: 0 }), { width: 0, height: 0 })
  assert.deepEqual(iconDimensions({ size: 32, width: "2em", height: 0 }), {
    width: "2em",
    height: 0,
  })
  assert.deepEqual(iconDimensions({ size: 32, width: null }), { width: 32, height: 32 })
})

test("sprite rendering preserves explicit accessibility and CSS variable overrides", () => {
  const style = { color: "red", "--icon-stroke-width": 5 }
  const icon = renderIcon("check", {
    size: 32,
    strokeWidth: 3,
    style,
    "aria-hidden": false,
    role: "img",
  })
  assert.equal(icon.props.children.props.href, "/icons.svg#check")
  assert.equal(icon.props["aria-hidden"], false)
  assert.equal(icon.props.role, "img")
  assert.equal(icon.props.style["--icon-stroke-width"], 5)
  assert.deepEqual(style, { color: "red", "--icon-stroke-width": 5 })
  assert.equal(renderIcon("check", {}).props["aria-hidden"], "true")
})

test("inline adaptation forwards props while leaving absent dimensions to the component", (t) => {
  const Component = t.mock.fn()
  const onClick = t.mock.fn()
  const icon = renderInline(Component, { size: 0, width: 12, onClick })
  assert.equal(icon.type, Component)
  assert.deepEqual(icon.props, { size: 0, width: 12, onClick })
  assert.deepEqual(renderInline(Component, { width: undefined, height: null }).props, { size: 24 })
})

test("custom names isolate development component state and keep the sprite fallback", async (t) => {
  const previous = process.env.NODE_ENV
  t.after(() => {
    if (previous === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previous
    }
  })
  process.env.NODE_ENV = "development"
  const moduleUrl = new URL("../dist/runtime/custom-icon.js?runtime-test", import.meta.url)
  const { CustomIcon } = await import(moduleUrl.href)
  const first = CustomIcon({ name: "first", size: 48 })
  const second = CustomIcon({ name: "second" })
  assert.equal(first.props.children.key, "first")
  assert.equal(second.props.children.key, "second")
  assert.equal(first.props.fallback.props.children.props.href, "/icons.svg#first")
  process.env.NODE_ENV = "production"
  assert.equal(CustomIcon({ name: "second" }).props.children.props.href, "/icons.svg#second")
})
