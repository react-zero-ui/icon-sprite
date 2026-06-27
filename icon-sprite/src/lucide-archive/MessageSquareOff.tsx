import { type IconProps } from "../_shared.js";

export function MessageSquareOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-message-square-off"
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
      <path d="M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" />
  <path d="m2 2 20 20" />
  <path d="M8.656 3H20a2 2 0 0 1 2 2v11.344" />
    </svg>
  );
}
