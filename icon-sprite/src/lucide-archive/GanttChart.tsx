import { type IconProps } from "../_shared.js";

export function GanttChart({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-gantt-chart"
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
      <path d="M6 5h12" />
  <path d="M4 12h10" />
  <path d="M12 19h8" />
    </svg>
  );
}
