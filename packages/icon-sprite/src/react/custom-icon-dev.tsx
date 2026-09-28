"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { CUSTOM_SVG_DIR } from "../sprite-contract.js"
import { type CustomIconProps, renderSvgUseElement, resolveIconDimensions } from "./icon.js"

type Payload = { attrs: Record<string, string | undefined>; innerHTML: string }
// A cache supplies first paint on remount. Every mount still refreshes from disk.
const payloadCache = new Map<string, Payload>()
const dimensionAttribute = /^(width|height)$/i
const eventHandlerAttribute = /^on[a-z]+/i
const surroundingSlashes = /^\/+|\/+$/g

/** Parse a trusted local SVG payload. Untrusted uploads need a separate sanitization boundary. */
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

/** Asset root attributes retain their historical precedence over matching React props. */
function applyPayload(element: SVGSVGElement, payload: Payload, incomingClass: string): void {
  const payloadClass = payload.attrs.class ?? payload.attrs.className ?? ""
  const mergedClass = [incomingClass, payloadClass].filter(Boolean).join(" ").trim()
  if (mergedClass) {
    element.setAttribute("class", mergedClass)
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
    element.setAttribute(key, value)
  }
}

/**
 * Development-only browser loader for CustomIcon. It caches the last payload for
 * first paint, refreshes every mount from the stable custom-asset URL, and falls
 * back to the same sprite element used outside development. It never writes files.
 */
function DevelopmentCustomIcon({ name, size, height, width, ...rest }: CustomIconProps) {
  const [payload, setPayload] = useState<Payload | null>(() =>
    typeof globalThis.document !== "undefined" ? (payloadCache.get(name) ?? null) : null
  )
  const svgRef = useRef<SVGSVGElement>(null)
  const incomingClass = rest.className ?? ""

  useLayoutEffect(() => {
    const element = svgRef.current
    if (!element || !payload) {
      return
    }
    applyPayload(element, payload, incomingClass)
  }, [payload, incomingClass])

  useEffect(() => {
    if (typeof globalThis.document === "undefined") {
      return
    }
    const controller = new AbortController()
    const base = `/${CUSTOM_SVG_DIR.replace(surroundingSlashes, "")}`
    const url = `${base}/${encodeURIComponent(name)}.svg?v=${Date.now()}`
    fetch(url, { cache: "no-store", signal: controller.signal })
      .then((response) =>
        response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`))
      )
      .then((svgText) => {
        if (controller.signal.aborted) {
          return
        }
        const nextPayload = extractSVGContent(svgText)
        payloadCache.set(name, nextPayload)
        setPayload(nextPayload)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.warn(
            `[CustomIcon] "${name}" not found. Add ${name}.svg to /public/${CUSTOM_SVG_DIR}/\nThen run: npx zero-icons\nDocs: https://github.com/react-zero-ui/icon-sprite#custom-icons`
          )
        }
        if (!controller.signal.aborted) {
          setPayload(null)
        }
      })
    return () => controller.abort()
  }, [name])

  if (payload) {
    return (
      <svg
        aria-hidden="true"
        ref={svgRef}
        {...resolveIconDimensions({ size, width, height })}
        {...rest}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted local SVG assets require raw markup; extractSVGContent removes scripts and event handlers.
        dangerouslySetInnerHTML={{ __html: payload.innerHTML }}
      />
    )
  }

  // fallback if fetch fails in dev
  return renderSvgUseElement(name, { size, width, height, ...rest })
}

export default DevelopmentCustomIcon
