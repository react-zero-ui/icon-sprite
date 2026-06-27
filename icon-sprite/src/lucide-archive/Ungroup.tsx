import { type IconProps } from "../_shared.js";

export function Ungroup({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-ungroup"
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
      <rect width="8" height="6" x="5" y="4" rx="1" />
  <rect width="8" height="6" x="11" y="14" rx="1" />
    </svg>
  );
}
