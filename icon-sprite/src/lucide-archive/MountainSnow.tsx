import { type IconProps } from "../_shared.js";

export function MountainSnow({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mountain-snow"
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
    </svg>
  );
}
