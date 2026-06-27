import { type IconProps } from "../_shared.js";

export function Birdhouse({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-birdhouse"
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
      <path d="M12 18v4" />
  <path d="m17 18 1.956-11.468" />
  <path d="m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8" />
  <path d="M4 18h16" />
  <path d="M7 18 5.044 6.532" />
  <circle cx="12" cy="10" r="2" />
    </svg>
  );
}
