import { type IconProps } from "../_shared.js";

export function UserRoundArrowLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-user-round-arrow-left"
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
      <path d="m19 16-3 3" />
  <path d="M2 21a8 8 0 0 1 12.664-6.5" />
  <path d="M22 19h-6l3 3" />
  <circle cx="10" cy="8" r="5" />
    </svg>
  );
}
