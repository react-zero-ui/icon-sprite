import { type IconProps } from "../_shared.js";

export function PhilippinePeso({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-philippine-peso"
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
      <path d="M20 11H4" />
  <path d="M20 7H4" />
  <path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" />
    </svg>
  );
}
