import { type IconProps } from "../_shared.js";

export function ListFilterPlus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-filter-plus"
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
      <path d="M12 5H2" />
  <path d="M6 12h12" />
  <path d="M9 19h6" />
  <path d="M16 5h6" />
  <path d="M19 8V2" />
    </svg>
  );
}
