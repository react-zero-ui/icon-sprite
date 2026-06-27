import { type IconProps } from "../_shared.js";

export function Navigation2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-navigation-2"
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
      <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </svg>
  );
}
