import { type IconProps } from "../_shared.js";

export function TextCursor({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-text-cursor"
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
      <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
  <path d="M7 22h1a4 4 0 0 0 4-4" />
  <path d="M7 2h1a4 4 0 0 1 4 4" />
    </svg>
  );
}
