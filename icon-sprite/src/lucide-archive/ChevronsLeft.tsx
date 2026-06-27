import { type IconProps } from "../_shared.js";

export function ChevronsLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chevrons-left"
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
      <path d="m11 17-5-5 5-5" />
  <path d="m18 17-5-5 5-5" />
    </svg>
  );
}
