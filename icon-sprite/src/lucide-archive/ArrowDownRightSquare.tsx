import { type IconProps } from "../_shared.js";

export function ArrowDownRightSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-down-right-square"
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
      <path d="M15 15 9 9" />
  <path d="M9 15h6V9" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
