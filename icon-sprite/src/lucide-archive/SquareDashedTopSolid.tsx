import { type IconProps } from "../_shared.js";

export function SquareDashedTopSolid({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-dashed-top-solid"
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
      <path d="M14 21h1" />
  <path d="M21 14v1" />
  <path d="M21 19a2 2 0 0 1-2 2" />
  <path d="M21 9v1" />
  <path d="M3 14v1" />
  <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
  <path d="M3 9v1" />
  <path d="M5 21a2 2 0 0 1-2-2" />
  <path d="M9 21h1" />
    </svg>
  );
}
