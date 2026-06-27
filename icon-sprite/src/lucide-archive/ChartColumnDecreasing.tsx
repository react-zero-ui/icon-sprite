import { type IconProps } from "../_shared.js";

export function ChartColumnDecreasing({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chart-column-decreasing"
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
      <path d="M13 17V9" />
  <path d="M18 17v-3" />
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="M8 17V5" />
    </svg>
  );
}
