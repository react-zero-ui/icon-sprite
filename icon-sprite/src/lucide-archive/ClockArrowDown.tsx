import { type IconProps } from "../_shared.js";

export function ClockArrowDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-arrow-down"
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
      <path d="M12 6v6l2 1" />
  <path d="M12.337 21.994a10 10 0 1 1 9.588-8.767" />
  <path d="m14 18 4 4 4-4" />
  <path d="M18 14v8" />
    </svg>
  );
}
