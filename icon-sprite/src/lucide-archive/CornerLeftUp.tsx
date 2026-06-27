import { type IconProps } from "../_shared.js";

export function CornerLeftUp({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-corner-left-up"
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
      <path d="M14 9 9 4 4 9" />
  <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
    </svg>
  );
}
