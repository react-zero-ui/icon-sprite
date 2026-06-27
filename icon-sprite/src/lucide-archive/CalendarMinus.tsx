import { type IconProps } from "../_shared.js";

export function CalendarMinus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-calendar-minus"
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
      <path d="M16 19h6" />
  <path d="M16 2v4" />
  <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" />
  <path d="M3 10h18" />
  <path d="M8 2v4" />
    </svg>
  );
}
