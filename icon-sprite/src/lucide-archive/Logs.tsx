import { type IconProps } from "../_shared.js";

export function Logs({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-logs"
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
      <path d="M3 5h1" />
  <path d="M3 12h1" />
  <path d="M3 19h1" />
  <path d="M8 5h1" />
  <path d="M8 12h1" />
  <path d="M8 19h1" />
  <path d="M13 5h8" />
  <path d="M13 12h8" />
  <path d="M13 19h8" />
    </svg>
  );
}
