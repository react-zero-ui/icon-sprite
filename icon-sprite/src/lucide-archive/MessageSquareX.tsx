import { type IconProps } from "../_shared.js";

export function MessageSquareX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-message-square-x"
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
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
  <path d="m14.5 8.5-5 5" />
  <path d="m9.5 8.5 5 5" />
    </svg>
  );
}
