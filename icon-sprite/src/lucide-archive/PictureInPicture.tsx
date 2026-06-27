import { type IconProps } from "../_shared.js";

export function PictureInPicture({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-picture-in-picture"
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
      <path d="M2 10h6V4" />
  <path d="m2 4 6 6" />
  <path d="M21 10V7a2 2 0 0 0-2-2h-7" />
  <path d="M3 14v2a2 2 0 0 0 2 2h3" />
  <rect x="12" y="14" width="10" height="7" rx="1" />
    </svg>
  );
}
