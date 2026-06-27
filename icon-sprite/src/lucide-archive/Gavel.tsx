import { type IconProps } from "../_shared.js";

export function Gavel({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gavel"
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
      <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
  <path d="m16 16 6-6" />
  <path d="m21.5 10.5-8-8" />
  <path d="m8 8 6-6" />
  <path d="m8.5 7.5 8 8" />
    </svg>
  );
}
