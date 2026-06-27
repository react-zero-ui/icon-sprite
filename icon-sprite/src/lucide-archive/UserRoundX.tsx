import { type IconProps } from "../_shared.js";

export function UserRoundX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-user-round-x"
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
      <path d="M2 21a8 8 0 0 1 11.873-7" />
  <circle cx="10" cy="8" r="5" />
  <path d="m17 17 5 5" />
  <path d="m22 17-5 5" />
    </svg>
  );
}
