import { type IconProps } from "../_shared.js";

export function GitPullRequestCreate({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-git-pull-request-create"
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
      <circle cx="6" cy="6" r="3" />
  <path d="M6 9v12" />
  <path d="M13 6h3a2 2 0 0 1 2 2v3" />
  <path d="M18 15v6" />
  <path d="M21 18h-6" />
    </svg>
  );
}
