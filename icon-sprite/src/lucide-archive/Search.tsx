import { type IconProps } from "../_shared.js";

export function Search({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-search"
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
      <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
    </svg>
  );
}
