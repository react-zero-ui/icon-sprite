import { type IconProps } from "../_shared.js";

export function SquareArrowRightExit({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-arrow-right-exit"
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
      {...rest}
      width={width ?? size ?? 24}
      height={height ?? size ?? 24}
    >
      <path d="M10 12h11" />
  <path d="m17 16 4-4-4-4" />
  <path d="M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" />
    </svg>
  );
}
