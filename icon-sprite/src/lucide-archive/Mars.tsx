import { type IconProps } from "../_shared.js";

export function Mars({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mars"
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
      <path d="M16 3h5v5" />
  <path d="m21 3-6.75 6.75" />
  <circle cx="10" cy="14" r="6" />
    </svg>
  );
}
