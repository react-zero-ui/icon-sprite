import { type IconProps } from "../_shared.js";

export function CornerDownRight({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-corner-down-right"
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
      <path d="m15 10 5 5-5 5" />
  <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  );
}
