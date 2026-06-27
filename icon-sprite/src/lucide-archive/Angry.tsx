import { type IconProps } from "../_shared.js";

export function Angry({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-angry"
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
  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
  <path d="M7.5 8 10 9" />
  <path d="m14 9 2.5-1" />
  <path d="M9 10h.01" />
  <path d="M15 10h.01" />
    </svg>
  );
}
