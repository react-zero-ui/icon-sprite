import { type IconProps } from "../_shared.js";

export function GalleryVerticalEnd({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gallery-vertical-end"
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
      <path d="M7 2h10" />
  <path d="M5 6h14" />
  <rect width="18" height="12" x="3" y="10" rx="2" />
    </svg>
  );
}
