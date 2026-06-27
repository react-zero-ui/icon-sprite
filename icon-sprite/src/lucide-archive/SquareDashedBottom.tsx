import { type IconProps } from "../_shared.js";

export function SquareDashedBottom({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-dashed-bottom"
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
      <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
  <path d="M9 21h1" />
  <path d="M14 21h1" />
    </svg>
  );
}
