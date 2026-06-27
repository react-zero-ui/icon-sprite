import { type IconProps } from "../_shared.js";

export function ChevronsUpDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chevrons-up-down"
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
      <path d="m7 15 5 5 5-5" />
  <path d="m7 9 5-5 5 5" />
    </svg>
  );
}
