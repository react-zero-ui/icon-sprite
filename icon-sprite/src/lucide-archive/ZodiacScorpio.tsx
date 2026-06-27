import { type IconProps } from "../_shared.js";

export function ZodiacScorpio({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-scorpio"
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
      <path d="M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3" />
  <path d="m22 19-3 3" />
  <path d="M5 19V5.5a1 1 0 0 1 5 0" />
  <path d="M5 5.5A2.5 2.5 0 0 0 2.5 3" />
    </svg>
  );
}
