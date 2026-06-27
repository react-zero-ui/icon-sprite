import { type IconProps } from "../_shared.js";

export function Annoyed({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-annoyed"
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
      <circle cx="12" cy="12" r="10" />
  <path d="M8 15h8" />
  <path d="M8 9h2" />
  <path d="M14 9h2" />
    </svg>
  );
}
