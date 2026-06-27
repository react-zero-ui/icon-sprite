import { type IconProps } from "../_shared.js";

export function UserLock({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-user-lock"
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
      <path d="M19 16v-2a2 2 0 0 0-4 0v2" />
  <path d="M9.5 15H7a4 4 0 0 0-4 4v2" />
  <circle cx="10" cy="7" r="4" />
  <rect x="13" y="16" width="8" height="5" rx=".899" />
    </svg>
  );
}
