import { type IconProps } from "../_shared.js";

export function SquareArrowOutUpLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-arrow-out-up-left"
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
      <path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
  <path d="m3 3 9 9" />
  <path d="M3 9V3h6" />
    </svg>
  );
}
