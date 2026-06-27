import { type IconProps } from "../_shared.js";

export function GitCommitHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-git-commit-horizontal"
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
      <circle cx="12" cy="12" r="3" />
  <line x1="3" x2="9" y1="12" y2="12" />
  <line x1="15" x2="21" y1="12" y2="12" />
    </svg>
  );
}
