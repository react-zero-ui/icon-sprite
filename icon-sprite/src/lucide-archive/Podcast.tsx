import { type IconProps } from "../_shared.js";

export function Podcast({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-podcast"
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
      <path d="M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z" fill="currentColor" />
  <path d="M16.85 18.58a9 9 0 1 0-9.7 0" />
  <path d="M8 14a5 5 0 1 1 8 0" />
  <circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}
