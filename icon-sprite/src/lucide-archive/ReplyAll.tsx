import { type IconProps } from "../_shared.js";

export function ReplyAll({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-reply-all"
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
      <path d="m12 17-5-5 5-5" />
  <path d="M22 18v-2a4 4 0 0 0-4-4H7" />
  <path d="m7 17-5-5 5-5" />
    </svg>
  );
}
