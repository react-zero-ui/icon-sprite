import { type IconProps } from "../_shared.js";

export function ArrowUpLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-up-left"
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
      <path d="M7 17V7h10" />
  <path d="M17 17 7 7" />
    </svg>
  );
}
