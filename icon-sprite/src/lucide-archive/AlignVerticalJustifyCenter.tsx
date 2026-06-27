import { type IconProps } from "../_shared.js";

export function AlignVerticalJustifyCenter({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-vertical-justify-center"
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
      <rect width="14" height="6" x="5" y="16" rx="2" />
  <rect width="10" height="6" x="7" y="2" rx="2" />
  <path d="M2 12h20" />
    </svg>
  );
}
