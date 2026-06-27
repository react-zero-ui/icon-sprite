import { type IconProps } from "../_shared.js";

export function Heading4({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-heading-4"
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
      <path d="M12 18V6" />
  <path d="M17 10v3a1 1 0 0 0 1 1h3" />
  <path d="M21 10v8" />
  <path d="M4 12h8" />
  <path d="M4 18V6" />
    </svg>
  );
}
