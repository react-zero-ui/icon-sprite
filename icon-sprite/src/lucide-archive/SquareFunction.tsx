import { type IconProps } from "../_shared.js";

export function SquareFunction({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-function"
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
  <path d="M9 11.2h5.7" />
    </svg>
  );
}
