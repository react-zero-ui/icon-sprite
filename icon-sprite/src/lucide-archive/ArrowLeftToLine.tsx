import { type IconProps } from "../_shared.js";

export function ArrowLeftToLine({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-left-to-line"
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
      <path d="M3 19V5" />
  <path d="m13 6-6 6 6 6" />
  <path d="M7 12h14" />
    </svg>
  );
}
