import { type IconProps } from "../_shared.js";

export function HardHat({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-hard-hat"
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
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
  <path d="M14 6a6 6 0 0 1 6 6v3" />
  <path d="M4 15v-3a6 6 0 0 1 6-6" />
  <rect x="2" y="15" width="20" height="4" rx="1" />
    </svg>
  );
}
