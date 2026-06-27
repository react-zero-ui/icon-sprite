import { type IconProps } from "../_shared.js";

export function CloudSync({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-cloud-sync"
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
      <path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5" />
  <path d="M17 22v-4h-4" />
  <path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" />
  <path d="M7 10v4h4" />
  <path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5" />
    </svg>
  );
}
