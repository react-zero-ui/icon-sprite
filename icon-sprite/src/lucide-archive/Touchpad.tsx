import { type IconProps } from "../_shared.js";

export function Touchpad({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-touchpad"
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
  <path d="M2 14h20" />
  <path d="M12 20v-6" />
    </svg>
  );
}
