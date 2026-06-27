import { type IconProps } from "../_shared.js";

export function HouseWifi({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-house-wifi"
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
      <path d="M9.5 13.866a4 4 0 0 1 5 .01" />
  <path d="M12 17h.01" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <path d="M7 10.754a8 8 0 0 1 10 0" />
    </svg>
  );
}
