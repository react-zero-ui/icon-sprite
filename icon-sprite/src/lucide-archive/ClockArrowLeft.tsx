import { type IconProps } from "../_shared.js";

export function ClockArrowLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-arrow-left"
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
      <path d="M12 6v6l1.5.8" />
  <path d="M12.338 21.994a10 10 0 1 1 9.587-8.767" />
  <path d="M14 18h8" />
  <path d="m18 22-4-4 4-4" />
    </svg>
  );
}
