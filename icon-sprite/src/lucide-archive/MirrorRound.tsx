import { type IconProps } from "../_shared.js";

export function MirrorRound({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mirror-round"
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
      <path d="M10 6.6 8.6 8" />
  <path d="M12 18v4" />
  <path d="M15 7.5 9.5 13" />
  <path d="M7 22h10" />
  <circle cx="12" cy="10" r="8" />
    </svg>
  );
}
