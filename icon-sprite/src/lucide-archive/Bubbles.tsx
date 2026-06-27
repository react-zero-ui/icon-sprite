import { type IconProps } from "../_shared.js";

export function Bubbles({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-bubbles"
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
      <path d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5" />
  <circle cx="18.5" cy="8.5" r="3.5" />
  <circle cx="7.5" cy="16.5" r="5.5" />
  <circle cx="7.5" cy="4.5" r="2.5" />
    </svg>
  );
}
