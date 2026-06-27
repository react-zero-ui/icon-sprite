import { type IconProps } from "../_shared.js";

export function Copyleft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-copyleft"
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
      <circle cx="12" cy="12" r="10" />
  <path d="M9.17 14.83a4 4 0 1 0 0-5.66" />
    </svg>
  );
}
