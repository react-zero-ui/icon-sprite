import { type IconProps } from "../_shared.js";

export function ArrowRightToLine({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-right-to-line"
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
      <path d="M17 12H3" />
  <path d="m11 18 6-6-6-6" />
  <path d="M21 5v14" />
    </svg>
  );
}
