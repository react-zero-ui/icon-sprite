import { type IconProps } from "../_shared.js";

export function MessageSquareShare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-message-square-share"
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
      <path d="M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4" />
  <path d="M16 3h6v6" />
  <path d="m16 9 6-6" />
    </svg>
  );
}
