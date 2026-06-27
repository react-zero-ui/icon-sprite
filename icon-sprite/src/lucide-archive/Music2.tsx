import { type IconProps } from "../_shared.js";

export function Music2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-music-2"
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
      <circle cx="8" cy="18" r="4" />
  <path d="M12 18V2l7 4" />
    </svg>
  );
}
