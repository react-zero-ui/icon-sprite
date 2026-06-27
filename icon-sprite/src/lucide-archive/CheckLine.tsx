import { type IconProps } from "../_shared.js";

export function CheckLine({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-check-line"
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
      <path d="M20 4L9 15" />
  <path d="M21 19L3 19" />
  <path d="M9 15L4 10" />
    </svg>
  );
}
