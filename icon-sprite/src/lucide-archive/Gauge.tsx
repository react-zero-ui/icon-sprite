import { type IconProps } from "../_shared.js";

export function Gauge({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gauge"
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
      <path d="m12 14 4-4" />
  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}
