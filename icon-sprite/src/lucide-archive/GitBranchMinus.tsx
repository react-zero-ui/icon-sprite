import { type IconProps } from "../_shared.js";

export function GitBranchMinus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-git-branch-minus"
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
      <path d="M15 6a9 9 0 0 0-9 9V3" />
  <path d="M21 18h-6" />
  <circle cx="18" cy="6" r="3" />
  <circle cx="6" cy="18" r="3" />
    </svg>
  );
}
