import { type IconProps } from "../_shared.js";

export function FolderSearch({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-folder-search"
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
      <path d="M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1" />
  <path d="m21 21-1.9-1.9" />
  <circle cx="17" cy="17" r="3" />
    </svg>
  );
}
