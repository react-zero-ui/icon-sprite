import { type IconProps } from "../_shared.js";

export function ClosedCaption({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-closed-caption"
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
      <path d="M10 9.17a3 3 0 1 0 0 5.66" />
  <path d="M17 9.17a3 3 0 1 0 0 5.66" />
  <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
  );
}
