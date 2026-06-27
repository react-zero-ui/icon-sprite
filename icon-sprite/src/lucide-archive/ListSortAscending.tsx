import { type IconProps } from "../_shared.js";

export function ListSortAscending({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-sort-ascending"
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
      <path d="M3 19h18" />
  <path d="M15 12H3" />
  <path d="M9 5H3" />
    </svg>
  );
}
