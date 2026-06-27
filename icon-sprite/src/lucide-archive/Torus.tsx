import { type IconProps } from "../_shared.js";

export function Torus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-torus"
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
      <ellipse cx="12" cy="11" rx="3" ry="2" />
  <ellipse cx="12" cy="12.5" rx="10" ry="8.5" />
    </svg>
  );
}
