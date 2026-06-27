import { type IconProps } from "../_shared.js";

export function FolderGit2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-folder-git-2"
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
      <path d="M18 19a5 5 0 0 1-5-5v8" />
  <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
  <circle cx="13" cy="12" r="2" />
  <circle cx="20" cy="19" r="2" />
    </svg>
  );
}
