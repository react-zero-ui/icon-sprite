import { type IconProps } from "../_shared.js";

export function PcCase({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-pc-case"
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
      <rect width="14" height="20" x="5" y="2" rx="2" />
  <path d="M15 14h.01" />
  <path d="M9 6h6" />
  <path d="M9 10h6" />
    </svg>
  );
}
