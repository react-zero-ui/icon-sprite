import { type IconProps } from "../_shared.js";

export function ListStart({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-start"
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
      <path d="M3 5h6" />
  <path d="M3 12h13" />
  <path d="M3 19h13" />
  <path d="m16 8-3-3 3-3" />
  <path d="M21 19V7a2 2 0 0 0-2-2h-6" />
    </svg>
  );
}
