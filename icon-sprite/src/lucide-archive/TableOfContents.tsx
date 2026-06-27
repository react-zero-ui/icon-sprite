import { type IconProps } from "../_shared.js";

export function TableOfContents({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-table-of-contents"
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
      <path d="M16 5H3" />
  <path d="M16 12H3" />
  <path d="M16 19H3" />
  <path d="M21 5h.01" />
  <path d="M21 12h.01" />
  <path d="M21 19h.01" />
    </svg>
  );
}
