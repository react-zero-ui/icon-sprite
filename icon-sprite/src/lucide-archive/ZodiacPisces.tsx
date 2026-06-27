import { type IconProps } from "../_shared.js";

export function ZodiacPisces({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-pisces"
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
      <path d="M19 21a15 15 0 0 1 0-18" />
  <path d="M20 12H4" />
  <path d="M5 3a15 15 0 0 1 0 18" />
    </svg>
  );
}
