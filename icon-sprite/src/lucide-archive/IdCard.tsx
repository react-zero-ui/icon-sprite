import { type IconProps } from "../_shared.js";

export function IdCard({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-id-card"
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
      <path d="M16 10h2" />
  <path d="M16 14h2" />
  <path d="M6.17 15a3 3 0 0 1 5.66 0" />
  <circle cx="9" cy="11" r="2" />
  <rect x="2" y="5" width="20" height="14" rx="2" />
    </svg>
  );
}
