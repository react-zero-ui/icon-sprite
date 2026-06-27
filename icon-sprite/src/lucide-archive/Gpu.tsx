import { type IconProps } from "../_shared.js";

export function Gpu({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gpu"
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
      <path d="M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2" />
  <path d="M2 21V3" />
  <path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3" />
  <circle cx="16" cy="11" r="2" />
  <circle cx="8" cy="11" r="2" />
    </svg>
  );
}
