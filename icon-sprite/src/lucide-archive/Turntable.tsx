import { type IconProps } from "../_shared.js";

export function Turntable({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-turntable"
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
      <path d="M10 12.01h.01" />
  <path d="M18 8v4a8 8 0 0 1-1.07 4" />
  <circle cx="10" cy="12" r="4" />
  <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}
