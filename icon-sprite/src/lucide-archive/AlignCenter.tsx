import { type IconProps } from "../_shared.js";

export function AlignCenter({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-center"
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
      <path d="M21 5H3" />
  <path d="M17 12H7" />
  <path d="M19 19H5" />
    </svg>
  );
}
