"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { CUSTOM_SVG_DIR, SPRITE_PATH } from "./config.js"
import { type IconProps, renderUse } from "./render-use.js"

interface CustomIconProps extends IconProps {
  name: string
}

type Payload = { attrs: Record<string, string | undefined>; innerHTML: string }
const mem = new Map<string, Payload>()
const dimensionAttribute = /^(width|height)$/i
const eventHandlerAttribute = /^on[a-z]+$/i
const surroundingSlashes = /^\/+|\/+$/g

function extractSVGContent(svg: string): Payload {
  const div = document.createElement("div")
  div.innerHTML = svg.trim()
  const svgEl = div.querySelector("svg")
  if (!svgEl) {
    throw new Error("Bad SVG: <svg> not found")
  }
  for (const script of div.querySelectorAll("script")) {
    script.remove()
  }
  ;[svgEl, ...svgEl.querySelectorAll("*")].forEach((el) => {
    for (const { name } of Array.from(el.attributes)) {
      if (eventHandlerAttribute.test(name)) {
        el.removeAttribute(name)
      }
    }
  })
  const attrs: Record<string, string | undefined> = {}
  for (const a of Array.from(svgEl.attributes)) {
    if (!dimensionAttribute.test(a.name)) {
      attrs[a.name] = a.value
    }
  }
  return { attrs, innerHTML: svgEl.innerHTML.trim() }
}

function applyPayload(el: SVGSVGElement, payload: Payload, incomingClass: string): void {
  const payloadClass = payload.attrs.class ?? payload.attrs.className ?? ""
  const mergedClass = [incomingClass, payloadClass].filter(Boolean).join(" ").trim()
  if (mergedClass) {
    el.setAttribute("class", mergedClass)
  }
  for (const [key, value] of Object.entries(payload.attrs)) {
    if (
      value === undefined ||
      key === "class" ||
      key === "className" ||
      dimensionAttribute.test(key) ||
      key === "xmlns" ||
      key.startsWith("xmlns:")
    ) {
      continue
    }
    el.setAttribute(key, value)
  }
}

function DevCustomIcon({ name, size, height, width, ...rest }: CustomIconProps) {
  const [payload, setPayload] = useState<Payload | null>(() =>
    typeof globalThis.document !== "undefined" ? (mem.get(name) ?? null) : null
  )
  const svgRef = useRef<SVGSVGElement>(null)
  const incomingClass = rest.className ?? ""

  useLayoutEffect(() => {
    const el = svgRef.current
    if (!el || !payload) {
      return
    }
    applyPayload(el, payload, incomingClass)
  }, [payload, incomingClass])

  useEffect(() => {
    if (typeof globalThis.document === "undefined") {
      return
    }
    const ctrl = new AbortController()
    const base = `/${CUSTOM_SVG_DIR.replace(surroundingSlashes, "")}`
    const url = `${base}/${encodeURIComponent(name)}.svg?v=${Date.now()}`
    fetch(url, { cache: "no-store", signal: ctrl.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((txt) => {
        if (ctrl.signal.aborted) {
          return
        }
        const p = extractSVGContent(txt)
        mem.set(name, p)
        setPayload(p)
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn(
            `[CustomIcon] "${name}" not found. Add ${name}.svg to /public/${CUSTOM_SVG_DIR}/\nThen run: npx zero-icons\nDocs: https://github.com/react-zero-ui/icon-sprite#custom-icons`
          )
        }
        if (!ctrl.signal.aborted) {
          setPayload(null)
        }
      })
    return () => ctrl.abort()
  }, [name])

  if (payload) {
    const w = width ?? size ?? 24
    const h = height ?? size ?? 24
    return (
      <svg
        aria-hidden="true"
        height={h}
        ref={svgRef}
        width={w}
        {...rest}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted local SVG assets require raw markup; extractSVGContent removes scripts and event handlers.
        dangerouslySetInnerHTML={{ __html: payload.innerHTML }}
      />
    )
  }

  // fallback if fetch fails in dev
  return renderUse(name, SPRITE_PATH, { size, width, height, ...rest })
}

export default DevCustomIcon
