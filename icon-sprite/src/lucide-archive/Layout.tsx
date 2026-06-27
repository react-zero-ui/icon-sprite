import { type IconProps } from "../_shared.js";

export function Layout({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-layout"
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M3 9h18" />
  <path d="M9 21V9" />
    </svg>
  );
}
