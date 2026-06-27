import { type IconProps } from "../_shared.js";

export function ArrowUp01({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-up-01"
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
      <path d="m3 8 4-4 4 4" />
  <path d="M7 4v16" />
  <rect x="15" y="4" width="4" height="6" ry="2" />
  <path d="M17 20v-6h-2" />
  <path d="M15 20h4" />
    </svg>
  );
}
