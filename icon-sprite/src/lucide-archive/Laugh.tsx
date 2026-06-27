import { type IconProps } from "../_shared.js";

export function Laugh({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-laugh"
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
      <circle cx="12" cy="12" r="10" />
  <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
  <line x1="9" x2="9.01" y1="9" y2="9" />
  <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
