import { type IconProps } from "../_shared.js";

export function ListEnd({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-end"
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
      <path d="M16 5H3" />
  <path d="M16 12H3" />
  <path d="M9 19H3" />
  <path d="m16 16-3 3 3 3" />
  <path d="M21 5v12a2 2 0 0 1-2 2h-6" />
    </svg>
  );
}
