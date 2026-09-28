import assert from "node:assert/strict"
import test from "node:test"
import { renderProdIcon, renderSvgUseElement, resolveIconDimensions } from "../dist/react/icon.js"

test("all React renderers share dimension precedence, including explicit zero", () => {
  assert.deepEqual(resolveIconDimensions({}), { width: 24, height: 24 })
  assert.deepEqual(resolveIconDimensions({ size: 0 }), { width: 0, height: 0 })
  assert.deepEqual(resolveIconDimensions({ size: 32, width: "2em", height: 0 }), {
    width: "2em",
    height: 0,
  })
  assert.deepEqual(resolveIconDimensions({ size: 32, width: null }), { width: 32, height: 32 })
})

test("sprite rendering preserves explicit accessibility and normal SVG presentation props", () => {
  const style = { color: "red" }
  const icon = renderSvgUseElement("check", {
    size: 32,
    strokeWidth: 3,
    style,
    "aria-hidden": false,
    role: "img",
  })
  assert.equal(icon.props.children.props.href, "/icons.svg#check")
  assert.equal(icon.props["aria-hidden"], false)
  assert.equal(icon.props.role, "img")
  assert.equal(icon.props.strokeWidth, 3)
  assert.equal(icon.props.style, style)
  assert.deepEqual(style, { color: "red" })
  assert.equal(renderSvgUseElement("check", {}).props["aria-hidden"], "true")
  assert.deepEqual(
    {
      fill: renderProdIcon("check", {}).props.fill,
      stroke: renderProdIcon("check", {}).props.stroke,
      strokeWidth: renderProdIcon("check", {}).props.strokeWidth,
      strokeLinecap: renderProdIcon("check", {}).props.strokeLinecap,
      strokeLinejoin: renderProdIcon("check", {}).props.strokeLinejoin,
    },
    {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }
  )
  const overridden = renderProdIcon("check", {
    fill: "red",
    stroke: "blue",
    strokeWidth: 4,
    strokeLinecap: "square",
    strokeLinejoin: "bevel",
  })
  assert.equal(overridden.props.fill, "red")
  assert.equal(overridden.props.stroke, "blue")
  assert.equal(overridden.props.strokeWidth, 4)
  assert.equal(overridden.props.strokeLinecap, "square")
  assert.equal(overridden.props.strokeLinejoin, "bevel")
  assert.equal(renderProdIcon("check", { stroke: undefined }).props.stroke, undefined)
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
  const moduleUrl = new URL("../dist/react/custom-icon.js?react-test", import.meta.url)
  const { CustomIcon } = await import(moduleUrl.href)
  const first = CustomIcon({ name: "first", size: 48 })
  const second = CustomIcon({ name: "second" })
  assert.equal(first.props.children.key, "first")
  assert.equal(second.props.children.key, "second")
  assert.equal(first.props.fallback.props.children.props.href, "/icons.svg#first")
  process.env.NODE_ENV = "production"
  assert.equal(CustomIcon({ name: "second" }).props.children.props.href, "/icons.svg#second")
})
