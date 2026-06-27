import { type IconProps } from "../_shared.js";

export function SquareRadical({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-radical"
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
      <path d="M7 12h2l2 5 2-10h4" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
