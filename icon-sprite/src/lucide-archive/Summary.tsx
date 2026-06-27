import { type IconProps } from "../_shared.js";

export function Summary({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-summary"
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
      <path d="M15 4H7" />
  <path d="m18 16 3 3-3 3" />
  <path d="M3 4v13a2 2 0 0 0 2 2h16" />
  <path d="M7 14h7" />
  <path d="M7 9h12" />
    </svg>
  );
}
