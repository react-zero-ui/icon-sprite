import { type IconProps } from "../_shared.js";

export function SeparatorVertical({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-separator-vertical"
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
      <path d="M12 3v18" />
  <path d="m16 16 4-4-4-4" />
  <path d="m8 8-4 4 4 4" />
    </svg>
  );
}
