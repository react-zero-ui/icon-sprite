import { type IconProps } from "../_shared.js";

export function ZodiacSagittarius({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-zodiac-sagittarius"
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
      <path d="M15 3h6v6" />
  <path d="M21 3 3 21" />
  <path d="m9 9 6 6" />
    </svg>
  );
}
