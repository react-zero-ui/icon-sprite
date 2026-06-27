import { type IconProps } from "../_shared.js";

export function ListCollapse({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-collapse"
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
      <path d="M10 5h11" />
  <path d="M10 12h11" />
  <path d="M10 19h11" />
  <path d="m3 10 3-3-3-3" />
  <path d="m3 20 3-3-3-3" />
    </svg>
  );
}
