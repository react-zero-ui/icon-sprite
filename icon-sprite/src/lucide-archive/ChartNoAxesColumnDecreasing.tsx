import { type IconProps } from "../_shared.js";

export function ChartNoAxesColumnDecreasing({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chart-no-axes-column-decreasing"
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
      <path d="M5 21V3" />
  <path d="M12 21V9" />
  <path d="M19 21v-6" />
    </svg>
  );
}
