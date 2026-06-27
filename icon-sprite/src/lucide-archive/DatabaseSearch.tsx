import { type IconProps } from "../_shared.js";

export function DatabaseSearch({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-database-search"
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
      <path d="M21 11.693V5" />
  <path d="m22 22-1.875-1.875" />
  <path d="M3 12a9 3 0 0 0 8.697 2.998" />
  <path d="M3 5v14a9 3 0 0 0 9.28 2.999" />
  <circle cx="18" cy="18" r="3" />
  <ellipse cx="12" cy="5" rx="9" ry="3" />
    </svg>
  );
}
