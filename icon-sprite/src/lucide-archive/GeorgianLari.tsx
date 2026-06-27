import { type IconProps } from "../_shared.js";

export function GeorgianLari({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-georgian-lari"
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
      <path d="M11.5 21a7.5 7.5 0 1 1 7.35-9" />
  <path d="M13 12V3" />
  <path d="M4 21h16" />
  <path d="M9 12V3" />
    </svg>
  );
}
