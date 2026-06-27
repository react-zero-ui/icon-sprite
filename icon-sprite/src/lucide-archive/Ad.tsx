import { type IconProps } from "../_shared.js";

export function Ad({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-ad"
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
      <path d="M10 13H6" />
  <path d="M10 15v-4a2 2 0 0 0-4 0v4" />
  <path d="M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z" />
  <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
  );
}
