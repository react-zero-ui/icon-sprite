import { type IconProps } from "../_shared.js";

export function FolderKey({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-folder-key"
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
      <path d="M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36" />
  <path d="M19 12v6" />
  <path d="M19 14h2" />
  <circle cx="19" cy="20" r="2" />
    </svg>
  );
}
