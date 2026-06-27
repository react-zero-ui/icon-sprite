import { type IconProps } from "../_shared.js";

export function Blend({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-blend"
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
      <circle cx="9" cy="9" r="7" />
  <circle cx="15" cy="15" r="7" />
    </svg>
  );
}
