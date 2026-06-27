import { type IconProps } from "../_shared.js";

export function UserRoundKey({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-user-round-key"
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
      <path d="M19 11v6" />
  <path d="M19 13h2" />
  <path d="M2 21a8 8 0 0 1 12.868-6.349" />
  <circle cx="10" cy="8" r="5" />
  <circle cx="19" cy="19" r="2" />
    </svg>
  );
}
