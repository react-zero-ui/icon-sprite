import type { CustomIconProps, IconProps } from "../dist/index.js"

type Expect<Condition extends true> = Condition
type UnsupportedProp =
  | "absoluteStrokeWidth"
  | "nonScalingStroke"
  | "title"
  | "children"
  | "dangerouslySetInnerHTML"
  | "viewBox"
  | "vectorEffect"

/** Compile-time regression checks for the product's own instance-prop contract. */
export type IconPropContract = [
  Expect<Extract<keyof IconProps, UnsupportedProp> extends never ? true : false>,
  Expect<"ref" extends keyof IconProps ? true : false>,
  Expect<"onClick" extends keyof IconProps ? true : false>,
  Expect<"aria-label" extends keyof IconProps ? true : false>,
  Expect<"data-testid" extends keyof IconProps ? true : false>,
  Expect<number extends NonNullable<IconProps["stroke"]> ? false : true>,
  Expect<
    {
      size: number
      width: string
      strokeWidth: number
      fill: string
      className: string
    } extends IconProps
      ? true
      : false
  >,
  Expect<
    { src: "/brand/logo.svg"; size: number; stroke: string } extends CustomIconProps ? true : false
  >,
  Expect<"/logo.svg" extends CustomIconProps["src"] ? true : false>,
  Expect<IconProps extends CustomIconProps ? false : true>,
  Expect<string extends CustomIconProps["src"] ? false : true>,
  Expect<"relative/logo.svg" extends CustomIconProps["src"] ? false : true>,
  Expect<"https://example.com/logo.svg" extends CustomIconProps["src"] ? false : true>,
  Expect<"/logo.png" extends CustomIconProps["src"] ? false : true>,
  Expect<Extract<number | null | undefined, CustomIconProps["src"]> extends never ? true : false>,
  Expect<"name" extends keyof CustomIconProps ? false : true>,
]
