import { type IconProps } from "../_shared.js";

export function Grid3x2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-grid-3x2"
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
      <path d="M15 3v18" />
  <path d="M3 12h18" />
  <path d="M9 3v18" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
