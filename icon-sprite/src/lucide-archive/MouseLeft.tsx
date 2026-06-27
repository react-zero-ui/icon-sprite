import { type IconProps } from "../_shared.js";

export function MouseLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mouse-left"
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
      <path d="M12 7.318V10" />
  <path d="M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7" />
  <circle cx="7" cy="4" r="2" />
    </svg>
  );
}
