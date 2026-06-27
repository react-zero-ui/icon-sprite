import { type IconProps } from "../_shared.js";

export function SplitSquareHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-split-square-horizontal"
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
      <path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" />
  <path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" />
  <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}
