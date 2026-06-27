import { type IconProps } from "../_shared.js";

export function WifiLow({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-wifi-low"
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
      <path d="M12 20h.01" />
  <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}
