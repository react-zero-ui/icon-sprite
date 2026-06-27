import { type IconProps } from "../_shared.js";

export function SquareArrowOutDownLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-arrow-out-down-left"
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
      <path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" />
  <path d="m3 21 9-9" />
  <path d="M9 21H3v-6" />
    </svg>
  );
}
