import { type IconProps } from "../_shared.js";

export function CalendarX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-calendar-x"
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
      <path d="M8 2v4" />
  <path d="M16 2v4" />
  <rect width="18" height="18" x="3" y="4" rx="2" />
  <path d="M3 10h18" />
  <path d="m14 14-4 4" />
  <path d="m10 14 4 4" />
    </svg>
  );
}
