import { type IconProps } from "../_shared.js";

export function SquareScissors({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-scissors"
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
  <circle cx="8.5" cy="8.5" r="1.5" />
  <line x1="9.56066" y1="9.56066" x2="12" y2="12" />
  <line x1="17" y1="17" x2="14.82" y2="14.82" />
  <circle cx="8.5" cy="15.5" r="1.5" />
  <line x1="9.56066" y1="14.43934" x2="17" y2="7" />
    </svg>
  );
}
