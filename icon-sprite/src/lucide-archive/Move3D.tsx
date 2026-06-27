import { type IconProps } from "../_shared.js";

export function Move3d({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-3d"
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
      <path d="M5 3v16h16" />
  <path d="m5 19 6-6" />
  <path d="m2 6 3-3 3 3" />
  <path d="m18 16 3 3-3 3" />
    </svg>
  );
}
