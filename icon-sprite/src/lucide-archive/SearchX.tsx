import { type IconProps } from "../_shared.js";

export function SearchX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-search-x"
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
      <path d="m13.5 8.5-5 5" />
  <path d="m8.5 8.5 5 5" />
  <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
