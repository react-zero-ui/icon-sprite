import { type IconProps } from "../_shared.js";

export function Menu({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-menu"
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
      <path d="M4 5h16" />
  <path d="M4 12h16" />
  <path d="M4 19h16" />
    </svg>
  );
}
