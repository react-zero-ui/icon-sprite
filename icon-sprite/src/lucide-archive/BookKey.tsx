import { type IconProps } from "../_shared.js";

export function BookKey({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-book-key"
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
      <path d="M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" />
  <path d="M17 2v6" />
  <path d="M17 4h2" />
  <path d="M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
  <circle cx="17" cy="10" r="2" />
    </svg>
  );
}
