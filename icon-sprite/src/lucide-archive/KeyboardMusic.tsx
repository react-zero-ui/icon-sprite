import { type IconProps } from "../_shared.js";

export function KeyboardMusic({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-keyboard-music"
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
  <path d="M6 8h4" />
  <path d="M14 8h.01" />
  <path d="M18 8h.01" />
  <path d="M2 12h20" />
  <path d="M6 12v4" />
  <path d="M10 12v4" />
  <path d="M14 12v4" />
  <path d="M18 12v4" />
    </svg>
  );
}
