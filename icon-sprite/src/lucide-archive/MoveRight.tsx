import { type IconProps } from "../_shared.js";

export function MoveRight({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-right"
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
      <path d="M18 8L22 12L18 16" />
  <path d="M2 12H22" />
    </svg>
  );
}
