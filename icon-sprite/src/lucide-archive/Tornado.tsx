import { type IconProps } from "../_shared.js";

export function Tornado({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-tornado"
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
      <path d="M21 4H3" />
  <path d="M18 8H6" />
  <path d="M19 12H9" />
  <path d="M16 16h-6" />
  <path d="M11 20H9" />
    </svg>
  );
}
