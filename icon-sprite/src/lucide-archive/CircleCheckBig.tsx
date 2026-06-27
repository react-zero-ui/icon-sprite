import { type IconProps } from "../_shared.js";

export function CircleCheckBig({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-check-big"
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
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
  <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
