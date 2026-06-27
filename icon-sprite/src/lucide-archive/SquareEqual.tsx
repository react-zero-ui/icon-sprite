import { type IconProps } from "../_shared.js";

export function SquareEqual({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-equal"
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M7 10h10" />
  <path d="M7 14h10" />
    </svg>
  );
}
