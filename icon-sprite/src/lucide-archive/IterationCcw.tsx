import { type IconProps } from "../_shared.js";

export function IterationCcw({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-iteration-ccw"
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
      <path d="m16 14 4 4-4 4" />
  <path d="M20 10a8 8 0 1 0-8 8h8" />
    </svg>
  );
}
