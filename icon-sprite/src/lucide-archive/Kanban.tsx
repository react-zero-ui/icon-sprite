import { type IconProps } from "../_shared.js";

export function Kanban({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-kanban"
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
      <path d="M5 3v14" />
  <path d="M12 3v8" />
  <path d="M19 3v18" />
    </svg>
  );
}
