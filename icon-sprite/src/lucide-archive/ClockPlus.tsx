import { type IconProps } from "../_shared.js";

export function ClockPlus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-plus"
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
      <path d="M12 6v6l3.644 1.822" />
  <path d="M16 19h6" />
  <path d="M19 16v6" />
  <path d="M21.92 13.267a10 10 0 1 0-8.653 8.653" />
    </svg>
  );
}
