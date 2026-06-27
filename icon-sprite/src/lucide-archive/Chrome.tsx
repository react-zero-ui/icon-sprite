import { type IconProps } from "../_shared.js";

export function Chrome({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chrome"
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
      <path d="M10.88 21.94 15.46 14" />
  <path d="M21.17 8H12" />
  <path d="M3.95 6.06 8.54 14" />
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
