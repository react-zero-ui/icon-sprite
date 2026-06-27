import { type IconProps } from "../_shared.js";

export function Pi({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-pi"
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
      <line x1="9" x2="9" y1="4" y2="20" />
  <path d="M4 7c0-1.7 1.3-3 3-3h13" />
  <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
    </svg>
  );
}
