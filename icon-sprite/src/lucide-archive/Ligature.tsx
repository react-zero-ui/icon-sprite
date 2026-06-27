import { type IconProps } from "../_shared.js";

export function Ligature({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-ligature"
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
      <path d="M14 12h2v8" />
  <path d="M14 20h4" />
  <path d="M6 12h4" />
  <path d="M6 20h4" />
  <path d="M8 20V8a4 4 0 0 1 7.464-2" />
    </svg>
  );
}
