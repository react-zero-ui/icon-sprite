import { type IconProps } from "../_shared.js";

export function Heading6({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-heading-6"
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
      <path d="M4 12h8" />
  <path d="M4 18V6" />
  <path d="M12 18V6" />
  <circle cx="19" cy="16" r="2" />
  <path d="M20 10c-2 2-3 3.5-3 6" />
    </svg>
  );
}
