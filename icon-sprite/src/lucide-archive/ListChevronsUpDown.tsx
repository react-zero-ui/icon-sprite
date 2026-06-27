import { type IconProps } from "../_shared.js";

export function ListChevronsUpDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-chevrons-up-down"
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
      <path d="M3 5h8" />
  <path d="M3 12h8" />
  <path d="M3 19h8" />
  <path d="m15 8 3-3 3 3" />
  <path d="m15 16 3 3 3-3" />
    </svg>
  );
}
