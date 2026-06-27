import { type IconProps } from "../_shared.js";

export function AlignHorizontalJustifyEnd({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-horizontal-justify-end"
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
      <rect width="6" height="14" x="2" y="5" rx="2" />
  <rect width="6" height="10" x="12" y="7" rx="2" />
  <path d="M22 2v20" />
    </svg>
  );
}
