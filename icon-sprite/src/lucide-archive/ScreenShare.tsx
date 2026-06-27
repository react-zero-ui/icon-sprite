import { type IconProps } from "../_shared.js";

export function ScreenShare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-screen-share"
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
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
  <path d="M8 21h8" />
  <path d="M12 17v4" />
  <path d="m17 8 5-5" />
  <path d="M17 3h5v5" />
    </svg>
  );
}
