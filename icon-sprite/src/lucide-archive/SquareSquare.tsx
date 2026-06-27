import { type IconProps } from "../_shared.js";

export function SquareSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-square"
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
  <rect x="8" y="8" width="8" height="8" rx="1" />
    </svg>
  );
}
