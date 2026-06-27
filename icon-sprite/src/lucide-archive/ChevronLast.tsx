import { type IconProps } from "../_shared.js";

export function ChevronLast({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chevron-last"
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
      <path d="m7 18 6-6-6-6" />
  <path d="M17 6v12" />
    </svg>
  );
}
