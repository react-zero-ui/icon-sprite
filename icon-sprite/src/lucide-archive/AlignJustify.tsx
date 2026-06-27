import { type IconProps } from "../_shared.js";

export function AlignJustify({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-align-justify"
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
      <path d="M3 5h18" />
  <path d="M3 12h18" />
  <path d="M3 19h18" />
    </svg>
  );
}
