import { type IconProps } from "../_shared.js";

export function PlayOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-play-off"
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
      <path d="m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23" />
  <path d="m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5" />
  <path d="m2 2 20 20" />
    </svg>
  );
}
