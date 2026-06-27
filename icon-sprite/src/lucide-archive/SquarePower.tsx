import { type IconProps } from "../_shared.js";

export function SquarePower({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-square-power"
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
      <path d="M12 7v4" />
  <path d="M7.998 9.003a5 5 0 1 0 8-.005" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
