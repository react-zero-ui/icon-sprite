import { type IconProps } from "../_shared.js";

export function ListMusic({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-music"
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
      <path d="M16 5H3" />
  <path d="M11 12H3" />
  <path d="M11 19H3" />
  <path d="M21 16V5" />
  <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
