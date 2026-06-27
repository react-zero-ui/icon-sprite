import { type IconProps } from "../_shared.js";

export function ArrowUpRightSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-up-right-square"
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
      <path d="M15 15V9H9" />
  <path d="m9 15 6-6" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
