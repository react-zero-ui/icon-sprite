import { type IconProps } from "../_shared.js";

export function MonitorSpeaker({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-monitor-speaker"
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
      <path d="M5.5 20H8" />
  <path d="M17 9h.01" />
  <rect width="10" height="16" x="12" y="4" rx="2" />
  <path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
  <circle cx="17" cy="15" r="1" />
    </svg>
  );
}
