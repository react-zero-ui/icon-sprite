import { type IconProps } from "../_shared.js";

export function MessageSquareDiff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-message-square-diff"
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
  <path d="M10 15h4" />
  <path d="M10 9h4" />
  <path d="M12 7v4" />
    </svg>
  );
}
