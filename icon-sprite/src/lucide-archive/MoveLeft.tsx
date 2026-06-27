import { type IconProps } from "../_shared.js";

export function MoveLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-left"
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
      <path d="M6 8L2 12L6 16" />
  <path d="M2 12H22" />
    </svg>
  );
}
