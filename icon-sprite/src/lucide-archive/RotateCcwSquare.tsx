import { type IconProps } from "../_shared.js";

export function RotateCcwSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rotate-ccw-square"
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
      <path d="M20 9V7a2 2 0 0 0-2-2h-6" />
  <path d="m15 2-3 3 3 3" />
  <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
