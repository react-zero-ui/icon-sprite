import { type IconProps } from "../_shared.js";

export function Microscope({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-microscope"
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
      <path d="M6 18h8" />
  <path d="M3 22h18" />
  <path d="M14 22a7 7 0 1 0 0-14h-1" />
  <path d="M9 14h2" />
  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}
