import { type IconProps } from "../_shared.js";

export function PoundSterling({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-pound-sterling"
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
      <path d="M18 7c0-5.333-8-5.333-8 0" />
  <path d="M10 7v14" />
  <path d="M6 21h12" />
  <path d="M6 13h10" />
    </svg>
  );
}
