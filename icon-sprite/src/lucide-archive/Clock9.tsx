import { type IconProps } from "../_shared.js";

export function Clock9({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-9"
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
  <path d="M12 6v6H8" />
    </svg>
  );
}
