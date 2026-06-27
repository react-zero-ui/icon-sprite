import { type IconProps } from "../_shared.js";

export function SeparatorHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-separator-horizontal"
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
      <path d="m16 16-4 4-4-4" />
  <path d="M3 12h18" />
  <path d="m8 8 4-4 4 4" />
    </svg>
  );
}
