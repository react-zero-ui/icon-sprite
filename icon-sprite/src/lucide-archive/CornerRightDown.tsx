import { type IconProps } from "../_shared.js";

export function CornerRightDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-corner-right-down"
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
      <path d="m10 15 5 5 5-5" />
  <path d="M4 4h7a4 4 0 0 1 4 4v12" />
    </svg>
  );
}
