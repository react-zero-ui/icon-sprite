import { type IconProps } from "../_shared.js";

export function AlignHorizontalSpaceAround({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-horizontal-space-around"
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
      <rect width="6" height="10" x="9" y="7" rx="2" />
  <path d="M4 22V2" />
  <path d="M20 22V2" />
    </svg>
  );
}
