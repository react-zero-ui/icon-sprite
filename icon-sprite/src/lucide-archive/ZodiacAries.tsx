import { type IconProps } from "../_shared.js";

export function ZodiacAries({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-aries"
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
      <path d="M12 7.5a4.5 4.5 0 1 1 5 4.5" />
  <path d="M7 12a4.5 4.5 0 1 1 5-4.5V21" />
    </svg>
  );
}
