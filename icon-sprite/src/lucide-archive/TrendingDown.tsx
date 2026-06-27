import { type IconProps } from "../_shared.js";

export function TrendingDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-trending-down"
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
      <path d="M16 17h6v-6" />
  <path d="m22 17-8.5-8.5-5 5L2 7" />
    </svg>
  );
}
