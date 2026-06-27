import { type IconProps } from "../_shared.js";

export function SquareArrowOutDownRight({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-arrow-out-down-right"
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
      <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
  <path d="m21 21-9-9" />
  <path d="M21 15v6h-6" />
    </svg>
  );
}
