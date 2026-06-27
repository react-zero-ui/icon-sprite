import { type IconProps } from "../_shared.js";

export function ChartBarDecreasing({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chart-bar-decreasing"
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
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="M7 11h8" />
  <path d="M7 16h3" />
  <path d="M7 6h12" />
    </svg>
  );
}
