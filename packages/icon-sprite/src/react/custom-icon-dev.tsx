"use client"
import { useEffect, useState } from "react"
import { customIconId } from "../sprite-contract.js"
import { type CustomIconProps, renderSvgUseElement, resolveIconDimensions } from "./icon.js"

// A cache supplies first paint on remount. Every mount still refreshes from disk.
const payloadCache = new Map<string, string>()
const eventHandlerAttribute = /^on[a-z]+/i

/** Preserve trusted artwork inside its own SVG so fixed paint stays local and inherit reaches instance props. */
function prepareCustomSvgMarkup(svg: string): string {
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
  // The outer SVG owns size in both modes; the authored viewBox scales artwork
  // within that viewport just as it does on the production symbol.
  svgEl.removeAttribute("width")
  svgEl.removeAttribute("height")
  return svgEl.outerHTML
}

/**
 * Development-only browser loader for CustomIcon. It caches the last payload for
 * first paint, refreshes every mount from the supplied source URL, and falls
 * back to the same sprite element used outside development. It never writes files.
 */
function DevelopmentCustomIcon({ src, size, height, width, ...rest }: CustomIconProps) {
  const [payload, setPayload] = useState<string | null>(() =>
    typeof globalThis.document !== "undefined" ? (payloadCache.get(src) ?? null) : null
  )

  useEffect(() => {
    if (typeof globalThis.document === "undefined") {
      return
    }
    const controller = new AbortController()
    const url = `${src}?v=${Date.now()}`
    fetch(url, { cache: "no-store", signal: controller.signal })
      .then((response) =>
        response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`))
      )
      .then((svgText) => {
        if (controller.signal.aborted) {
          return
        }
        const nextPayload = prepareCustomSvgMarkup(svgText)
        payloadCache.set(src, nextPayload)
        setPayload(nextPayload)
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.warn(
            `[CustomIcon] Could not load "${src}". Check that the SVG exists in public/.\nDocs: https://github.com/react-zero-ui/icon-sprite#custom-icons`
          )
        }
        if (!controller.signal.aborted) {
          setPayload(null)
        }
      })
    return () => controller.abort()
  }, [src])

  if (payload) {
    return (
      <svg
        aria-hidden="true"
        {...resolveIconDimensions({ size, width, height })}
        {...rest}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted local artwork is preserved; prepareCustomSvgMarkup removes scripts and event handlers.
        dangerouslySetInnerHTML={{ __html: payload }}
      />
    )
  }

  // fallback if fetch fails in dev
  return renderSvgUseElement(customIconId(src), { size, width, height, ...rest })
}

export default DevelopmentCustomIcon
