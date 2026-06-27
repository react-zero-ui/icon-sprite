import { type IconProps } from "../_shared.js";

export function ContactRound({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-contact-round"
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
      <path d="M16 2v2" />
  <path d="M17.915 22a6 6 0 0 0-12 0" />
  <path d="M8 2v2" />
  <circle cx="12" cy="12" r="4" />
  <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  );
}
