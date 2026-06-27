import { type IconProps } from "../_shared.js";

export function LineStyle({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-line-style"
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
      <path d="M11 5h2" />
  <path d="M15 12h6" />
  <path d="M19 5h2" />
  <path d="M3 12h6" />
  <path d="M3 19h18" />
  <path d="M3 5h2" />
    </svg>
  );
}
