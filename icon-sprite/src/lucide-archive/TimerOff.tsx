import { type IconProps } from "../_shared.js";

export function TimerOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-timer-off"
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
      <path d="M10 2h4" />
  <path d="M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" />
  <path d="M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" />
  <path d="m2 2 20 20" />
  <path d="M12 12v-2" />
    </svg>
  );
}
