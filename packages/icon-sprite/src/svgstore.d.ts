/** The svgstore API used by the CLI, verified against svgstore 3.0.1. */
// biome-ignore lint/correctness/noUnresolvedImports: Node resolves svgstore's CommonJS main; this declaration types its verified API.
declare module "svgstore" {
  interface Options {
    copyAttrs?: string[]
    inline?: boolean
    svgAttrs?: Record<string, string>
    symbolAttrs?: Record<string, string>
  }

  interface Store {
    add(id: string, svg: string, options?: Options): Store
    element: XmlDocument
    toString(options?: Options): string
  }

  /** Minimal XML API exposed by svgstore's existing parser. */
  interface XmlDocument {
    load(markup: string, options: { xmlMode: boolean }): XmlDocument
    (selector: string): XmlSelection
  }

  interface XmlSelection {
    append(content: XmlSelection): XmlSelection
    attr(): Record<string, string> | undefined
    attr(attributes: Record<string, string>): XmlSelection
    contents(): XmlSelection
    first(): XmlSelection
  }

  export default function svgstore(options?: Options): Store
}
