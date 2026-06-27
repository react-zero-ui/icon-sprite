import { type IconProps } from "../_shared.js";

export function MonitorStop({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-monitor-stop"
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
      <path d="M12 17v4" />
  <path d="M8 21h8" />
  <rect x="2" y="3" width="20" height="14" rx="2" />
  <rect x="9" y="7" width="6" height="6" rx="1" />
    </svg>
  );
}
