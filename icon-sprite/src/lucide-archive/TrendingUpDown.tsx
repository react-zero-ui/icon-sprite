import { type IconProps } from "../_shared.js";

export function TrendingUpDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-trending-up-down"
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
      <path d="M14.828 14.828 21 21" />
  <path d="M21 16v5h-5" />
  <path d="m21 3-9 9-4-4-6 6" />
  <path d="M21 8V3h-5" />
    </svg>
  );
}
