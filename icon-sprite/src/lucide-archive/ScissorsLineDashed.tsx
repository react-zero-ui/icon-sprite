import { type IconProps } from "../_shared.js";

export function ScissorsLineDashed({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-scissors-line-dashed"
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
      <path d="M5.42 9.42 8 12" />
  <circle cx="4" cy="8" r="2" />
  <path d="m14 6-8.58 8.58" />
  <circle cx="4" cy="16" r="2" />
  <path d="M10.8 14.8 14 18" />
  <path d="M16 12h-2" />
  <path d="M22 12h-2" />
    </svg>
  );
}
