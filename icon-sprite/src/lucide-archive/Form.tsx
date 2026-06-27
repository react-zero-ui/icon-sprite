import { type IconProps } from "../_shared.js";

export function Form({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-form"
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
      <path d="M4 14h6" />
  <path d="M4 2h10" />
  <rect x="4" y="18" width="16" height="4" rx="1" />
  <rect x="4" y="6" width="16" height="4" rx="1" />
    </svg>
  );
}
