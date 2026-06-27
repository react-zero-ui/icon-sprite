import { type IconProps } from "../_shared.js";

export function ChevronsDownUp({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chevrons-down-up"
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
      <path d="m7 20 5-5 5 5" />
  <path d="m7 4 5 5 5-5" />
    </svg>
  );
}
