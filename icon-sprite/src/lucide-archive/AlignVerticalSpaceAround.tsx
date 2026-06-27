import { type IconProps } from "../_shared.js";

export function AlignVerticalSpaceAround({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-vertical-space-around"
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
      <rect width="10" height="6" x="7" y="9" rx="2" />
  <path d="M22 20H2" />
  <path d="M22 4H2" />
    </svg>
  );
}
