import { type IconProps } from "../_shared.js";

export function KanbanSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-kanban-square"
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M8 7v7" />
  <path d="M12 7v4" />
  <path d="M16 7v9" />
    </svg>
  );
}
