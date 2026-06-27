import { type IconProps } from "../_shared.js";

export function Mouse({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-mouse"
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
      <rect x="5" y="2" width="14" height="20" rx="7" />
  <path d="M12 6v4" />
    </svg>
  );
}
