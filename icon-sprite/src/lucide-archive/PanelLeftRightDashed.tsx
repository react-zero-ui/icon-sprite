import { type IconProps } from "../_shared.js";

export function PanelLeftRightDashed({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-panel-left-right-dashed"
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
      <path d="M15 10V9" />
  <path d="M15 15v-1" />
  <path d="M15 21v-2" />
  <path d="M15 5V3" />
  <path d="M9 10V9" />
  <path d="M9 15v-1" />
  <path d="M9 21v-2" />
  <path d="M9 5V3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
