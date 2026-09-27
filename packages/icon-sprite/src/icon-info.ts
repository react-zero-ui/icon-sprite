/** Shared build-manifest contract. The catalog owns names and sprite IDs. */
export interface IconInfo {
  pack: "lucide" | "tabler"
  spriteId: string
  svgFile: string
}
