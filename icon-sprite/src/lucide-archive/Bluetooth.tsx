import { type IconProps } from "../_shared.js";

export function Bluetooth({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-bluetooth"
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
      <path d="m7 7 10 10-5 5V2l5 5L7 17" />
    </svg>
  );
}
