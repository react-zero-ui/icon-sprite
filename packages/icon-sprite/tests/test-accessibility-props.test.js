import assert from "node:assert/strict"
import test from "node:test"
import { Activity } from "../dist/icons/Activity.js"
import { IconAccessible } from "../dist/icons/IconAccessible.js"

test("icons share a decorative ARIA default and explicit overrides in every rendering mode", (t) => {
  const previous = process.env.NODE_ENV
  t.after(() => {
    if (previous === undefined) {
      delete process.env.NODE_ENV
    } else {
      process.env.NODE_ENV = previous
    }
  })

  for (const environment of ["development", "test", "production"]) {
    process.env.NODE_ENV = environment
    for (const Icon of [Activity, IconAccessible]) {
      for (const props of [
        {},
        { "aria-label": "Activity", role: "img" },
        { "aria-hidden": false, "aria-label": "Activity", role: "img" },
        { "aria-hidden": "false" },
        { "aria-hidden": undefined },
      ]) {
        const wrapper = Icon(props)
        const svg = wrapper.type === "svg" ? wrapper : wrapper.type(wrapper.props)
        const expected = Object.hasOwn(props, "aria-hidden") ? props["aria-hidden"] : "true"
        assert.equal(svg.props["aria-hidden"], expected, `${Icon.name} ${environment}`)
        assert.equal(svg.props["aria-label"], props["aria-label"])
        assert.equal(svg.props.role, props.role)
      }
    }
  }
})
