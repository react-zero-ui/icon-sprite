import { type IconProps } from "../_shared.js";

export function ClockCheck({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-check"
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
      <path d="M12 6v6l4 2" />
  <path d="M22 12a10 10 0 1 0-11 9.95" />
  <path d="m22 16-5.5 5.5L14 19" />
    </svg>
  );
}
