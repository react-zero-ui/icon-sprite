import { type IconProps } from "../_shared.js";

export function X({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-x"
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
      <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
    </svg>
  );
}
