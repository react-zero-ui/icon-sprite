import { type IconProps } from "../_shared.js";

export function Axis3d({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-axis-3-d"
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
      <path d="M13.5 10.5 15 9" />
  <path d="M4 4v15a1 1 0 0 0 1 1h15" />
  <path d="M4.293 19.707 6 18" />
  <path d="m9 15 1.5-1.5" />
    </svg>
  );
}
