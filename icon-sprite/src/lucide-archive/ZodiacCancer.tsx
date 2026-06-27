import { type IconProps } from "../_shared.js";

export function ZodiacCancer({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-cancer"
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
      <path d="M21 14.5A9 6.5 0 0 1 5.5 19" />
  <path d="M3 9.5A9 6.5 0 0 1 18.5 5" />
  <circle cx="17.5" cy="14.5" r="3.5" />
  <circle cx="6.5" cy="9.5" r="3.5" />
    </svg>
  );
}
