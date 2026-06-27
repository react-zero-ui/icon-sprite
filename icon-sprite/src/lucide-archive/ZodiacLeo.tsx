import { type IconProps } from "../_shared.js";

export function ZodiacLeo({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-leo"
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
      <path d="M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0" />
  <circle cx="7" cy="16" r="3" />
    </svg>
  );
}
