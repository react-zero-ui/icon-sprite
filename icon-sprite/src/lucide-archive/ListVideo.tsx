import { type IconProps } from "../_shared.js";

export function ListVideo({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-list-video"
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
      <path d="M21 5H3" />
  <path d="M10 12H3" />
  <path d="M10 19H3" />
  <path d="M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" />
    </svg>
  );
}
