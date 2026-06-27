import { type IconProps } from "../_shared.js";

export function RotateCwSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rotate-cw-square"
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
      <path d="M12 5H6a2 2 0 0 0-2 2v3" />
  <path d="m9 8 3-3-3-3" />
  <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}
