import { type IconProps } from "../_shared.js";

export function ZodiacTaurus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-taurus"
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
      <circle cx="12" cy="15" r="6" />
  <path d="M18 3A6 6 0 0 1 6 3" />
    </svg>
  );
}
