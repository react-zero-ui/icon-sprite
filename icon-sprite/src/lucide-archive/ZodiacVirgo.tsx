import { type IconProps } from "../_shared.js";

export function ZodiacVirgo({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-virgo"
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
      <path d="M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5" />
  <path d="M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5" />
  <path d="M6 19V6a3 3 0 0 0-3-3h0" />
  <path d="M6 5.5a1 1 0 0 1 5 0V19" />
    </svg>
  );
}
