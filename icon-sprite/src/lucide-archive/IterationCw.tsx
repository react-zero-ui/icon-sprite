import { type IconProps } from "../_shared.js";

export function IterationCw({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-iteration-cw"
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
      <path d="M4 10a8 8 0 1 1 8 8H4" />
  <path d="m8 22-4-4 4-4" />
    </svg>
  );
}
