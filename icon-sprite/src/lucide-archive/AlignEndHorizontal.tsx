import { type IconProps } from "../_shared.js";

export function AlignEndHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-end-horizontal"
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
      <rect width="6" height="16" x="4" y="2" rx="2" />
  <rect width="6" height="9" x="14" y="9" rx="2" />
  <path d="M22 22H2" />
    </svg>
  );
}
