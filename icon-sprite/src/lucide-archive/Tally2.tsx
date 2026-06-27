import { type IconProps } from "../_shared.js";

export function Tally2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-tally-2"
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
      <path d="M4 4v16" />
  <path d="M9 4v16" />
    </svg>
  );
}
