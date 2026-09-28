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
    toString(options?: Options): string
  }

  export default function svgstore(options?: Options): Store
}
