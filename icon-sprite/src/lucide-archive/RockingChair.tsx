import { type IconProps } from "../_shared.js";

export function RockingChair({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rocking-chair"
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
      <path d="m15 13 3.708 7.416" />
  <path d="M3 19a15 15 0 0 0 18 0" />
  <path d="m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" />
  <path d="m9 13-3.708 7.416" />
    </svg>
  );
}
