import { type IconProps } from "../_shared.js";

export function DoorClosedLocked({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-door-closed-locked"
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
      <path d="M10 12h.01" />
  <path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
  <path d="M2 20h8" />
  <path d="M20 17v-2a2 2 0 1 0-4 0v2" />
  <rect x="14" y="17" width="8" height="5" rx="1" />
    </svg>
  );
}
