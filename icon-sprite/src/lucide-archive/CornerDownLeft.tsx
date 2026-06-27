import { type IconProps } from "../_shared.js";

export function CornerDownLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-corner-down-left"
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
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  <path d="m9 10-5 5 5 5" />
    </svg>
  );
}
