import { type IconProps } from "../_shared.js";

export function Calendar1({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-calendar-1"
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
      <path d="M11 14h1v4" />
  <path d="M16 2v4" />
  <path d="M3 10h18" />
  <path d="M8 2v4" />
  <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  );
}
