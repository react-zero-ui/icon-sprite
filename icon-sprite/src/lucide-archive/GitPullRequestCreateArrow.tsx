import { type IconProps } from "../_shared.js";

export function GitPullRequestCreateArrow({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-git-pull-request-create-arrow"
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
      <circle cx="5" cy="6" r="3" />
  <path d="M5 9v12" />
  <path d="m15 9-3-3 3-3" />
  <path d="M12 6h5a2 2 0 0 1 2 2v3" />
  <path d="M19 15v6" />
  <path d="M22 18h-6" />
    </svg>
  );
}
