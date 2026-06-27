import { type IconProps } from "../_shared.js";

export function Calendars({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-calendars"
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
      <path d="M12 2v2" />
  <path d="M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" />
  <path d="M18 2v2" />
  <path d="M2 13h2" />
  <path d="M8 8h14" />
  <rect x="8" y="3" width="14" height="14" rx="2" />
    </svg>
  );
}
