import { type IconProps } from "../_shared.js";

export function BadgeIndianRupee({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-badge-indian-rupee"
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
  <path d="M8 8h8" />
  <path d="M8 12h8" />
  <path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
    </svg>
  );
}
