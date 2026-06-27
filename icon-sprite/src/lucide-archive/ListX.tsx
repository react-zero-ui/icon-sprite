import { type IconProps } from "../_shared.js";

export function ListX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-x"
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
  <path d="M11 12H3" />
  <path d="M16 19H3" />
  <path d="m15.5 9.5 5 5" />
  <path d="m20.5 9.5-5 5" />
    </svg>
  );
}
