import { type IconProps } from "../_shared.js";

export function CopyX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-copy-x"
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
      <line x1="12" x2="18" y1="12" y2="18" />
  <line x1="12" x2="18" y1="18" y2="12" />
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
