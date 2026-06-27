import { type IconProps } from "../_shared.js";

export function Martini({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-martini"
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
      <path d="M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z" />
  <path d="M12 12v10" />
  <path d="M7 22h10" />
    </svg>
  );
}
