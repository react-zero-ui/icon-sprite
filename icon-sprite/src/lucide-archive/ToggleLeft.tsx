import { type IconProps } from "../_shared.js";

export function ToggleLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-toggle-left"
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
      <circle cx="9" cy="12" r="3" />
  <rect width="20" height="14" x="2" y="5" rx="7" />
    </svg>
  );
}
