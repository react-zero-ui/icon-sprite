import { type IconProps } from "../_shared.js";

export function TurkishLira({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-turkish-lira"
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
      <path d="M15 4 5 9" />
  <path d="m15 8.5-10 5" />
  <path d="M18 12a9 9 0 0 1-9 9V3" />
    </svg>
  );
}
