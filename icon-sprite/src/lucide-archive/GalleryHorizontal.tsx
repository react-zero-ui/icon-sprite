import { type IconProps } from "../_shared.js";

export function GalleryHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gallery-horizontal"
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
      <path d="M2 3v18" />
  <rect width="12" height="18" x="6" y="3" rx="2" />
  <path d="M22 3v18" />
    </svg>
  );
}
