import { type IconProps } from "../_shared.js";

export function Rotate3d({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rotate-3d"
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
      <path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
  <path d="M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" />
  <path d="M21.79796 11 A 10 5 0 1 0 19 15.57071" />
    </svg>
  );
}
