import { type IconProps } from "../_shared.js";

export function CirclePoundSterling({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-pound-sterling"
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
  <path d="M10 16V9.5a1 1 0 0 1 5 0" />
  <path d="M8 12h4" />
  <path d="M8 16h7" />
    </svg>
  );
}
