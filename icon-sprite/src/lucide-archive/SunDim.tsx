import { type IconProps } from "../_shared.js";

export function SunDim({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-sun-dim"
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
      <circle cx="12" cy="12" r="4" />
  <path d="M12 4h.01" />
  <path d="M20 12h.01" />
  <path d="M12 20h.01" />
  <path d="M4 12h.01" />
  <path d="M17.657 6.343h.01" />
  <path d="M17.657 17.657h.01" />
  <path d="M6.343 17.657h.01" />
  <path d="M6.343 6.343h.01" />
    </svg>
  );
}
