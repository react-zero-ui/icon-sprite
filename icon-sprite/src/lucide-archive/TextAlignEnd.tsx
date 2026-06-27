import { type IconProps } from "../_shared.js";

export function TextAlignEnd({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-text-align-end"
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
      <path d="M21 5H3" />
  <path d="M21 12H9" />
  <path d="M21 19H7" />
    </svg>
  );
}
