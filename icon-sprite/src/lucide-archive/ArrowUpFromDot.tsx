import { type IconProps } from "../_shared.js";

export function ArrowUpFromDot({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-up-from-dot"
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
      <path d="m5 9 7-7 7 7" />
  <path d="M12 16V2" />
  <circle cx="12" cy="21" r="1" />
    </svg>
  );
}
