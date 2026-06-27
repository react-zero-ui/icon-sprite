import { type IconProps } from "../_shared.js";

export function MoveDiagonal2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-diagonal-2"
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
      <path d="M19 13v6h-6" />
  <path d="M5 11V5h6" />
  <path d="m5 5 14 14" />
    </svg>
  );
}
