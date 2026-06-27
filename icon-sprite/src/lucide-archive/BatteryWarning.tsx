import { type IconProps } from "../_shared.js";

export function BatteryWarning({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-battery-warning"
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
      <path d="M10 17h.01" />
  <path d="M10 7v6" />
  <path d="M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
  <path d="M22 14v-4" />
  <path d="M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
