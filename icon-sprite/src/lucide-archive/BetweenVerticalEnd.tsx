import { type IconProps } from "../_shared.js";

export function BetweenVerticalEnd({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-between-vertical-end"
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
      <rect width="7" height="13" x="3" y="3" rx="1" />
  <path d="m9 22 3-3 3 3" />
  <rect width="7" height="13" x="14" y="3" rx="1" />
    </svg>
  );
}
