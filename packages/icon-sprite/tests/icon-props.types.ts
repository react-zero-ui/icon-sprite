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
  Expect<{ name: string; size: number; stroke: string } extends CustomIconProps ? true : false>,
]
