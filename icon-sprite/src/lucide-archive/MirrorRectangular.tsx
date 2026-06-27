import { type IconProps } from "../_shared.js";

export function MirrorRectangular({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mirror-rectangular"
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
      <path d="M11 6 8 9" />
  <path d="m16 7-8 8" />
  <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  );
}
