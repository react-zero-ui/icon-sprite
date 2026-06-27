import { type IconProps } from "../_shared.js";

export function ChartNetwork({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chart-network"
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
      <path d="m13.11 7.664 1.78 2.672" />
  <path d="m14.162 12.788-3.324 1.424" />
  <path d="m20 4-6.06 1.515" />
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <circle cx="12" cy="6" r="2" />
  <circle cx="16" cy="12" r="2" />
  <circle cx="9" cy="15" r="2" />
    </svg>
  );
}
