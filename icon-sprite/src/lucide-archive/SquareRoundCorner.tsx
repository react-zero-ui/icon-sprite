import { type IconProps } from "../_shared.js";

export function SquareRoundCorner({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-round-corner"
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
      <path d="M21 11a8 8 0 0 0-8-8" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );
}
