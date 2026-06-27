import { type IconProps } from "../_shared.js";

export function Dessert({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-dessert"
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
      <path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826" />
  <path d="M20.804 14.869a9 9 0 0 1-17.608 0" />
  <circle cx="12" cy="4" r="2" />
    </svg>
  );
}
