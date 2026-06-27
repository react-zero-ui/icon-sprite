import { type IconProps } from "../_shared.js";

export function GalleryThumbnails({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gallery-thumbnails"
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
      <rect width="18" height="14" x="3" y="3" rx="2" />
  <path d="M4 21h1" />
  <path d="M9 21h1" />
  <path d="M14 21h1" />
  <path d="M19 21h1" />
    </svg>
  );
}
