import { type IconProps } from "../_shared.js";

export function MoveDownLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-down-left"
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
      <path d="M11 19H5V13" />
  <path d="M19 5L5 19" />
    </svg>
  );
}
