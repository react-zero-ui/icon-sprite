import { type IconProps } from "../_shared.js";

export function SearchAlert({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-search-alert"
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
      <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
  <path d="M11 7v4" />
  <path d="M11 15h.01" />
    </svg>
  );
}
