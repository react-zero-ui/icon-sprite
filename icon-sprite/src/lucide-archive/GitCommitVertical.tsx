import { type IconProps } from "../_shared.js";

export function GitCommitVertical({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-git-commit-vertical"
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
      <path d="M12 3v6" />
  <circle cx="12" cy="12" r="3" />
  <path d="M12 15v6" />
    </svg>
  );
}
