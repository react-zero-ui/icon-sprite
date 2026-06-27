import { type IconProps } from "../_shared.js";

export function DraftingCompass({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-drafting-compass"
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
      <path d="m12.99 6.74 1.93 3.44" />
  <path d="M19.136 12a10 10 0 0 1-14.271 0" />
  <path d="m21 21-2.16-3.84" />
  <path d="m3 21 8.02-14.26" />
  <circle cx="12" cy="5" r="2" />
    </svg>
  );
}
