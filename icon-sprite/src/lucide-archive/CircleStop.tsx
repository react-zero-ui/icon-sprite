import { type IconProps } from "../_shared.js";

export function CircleStop({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-stop"
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
  <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}
