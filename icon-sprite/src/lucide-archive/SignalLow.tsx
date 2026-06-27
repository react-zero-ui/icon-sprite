import { type IconProps } from "../_shared.js";

export function SignalLow({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-signal-low"
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
      <path d="M2 20h.01" />
  <path d="M7 20v-4" />
    </svg>
  );
}
