import { type IconProps } from "../_shared.js";

export function Caravan({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-caravan"
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
      <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
  <path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" />
  <path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" />
  <circle cx="8" cy="19" r="2" />
    </svg>
  );
}
