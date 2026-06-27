import { type IconProps } from "../_shared.js";

export function SmilePlus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-smile-plus"
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
      <path d="M22 11v1a10 10 0 1 1-9-10" />
  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
  <line x1="9" x2="9.01" y1="9" y2="9" />
  <line x1="15" x2="15.01" y1="9" y2="9" />
  <path d="M16 5h6" />
  <path d="M19 2v6" />
    </svg>
  );
}
