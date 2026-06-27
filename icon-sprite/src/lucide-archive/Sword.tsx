import { type IconProps } from "../_shared.js";

export function Sword({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-sword"
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
      <path d="m11 19-6-6" />
  <path d="m5 21-2-2" />
  <path d="m8 16-4 4" />
  <path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
    </svg>
  );
}
