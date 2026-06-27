import { type IconProps } from "../_shared.js";

export function TvMinimal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-tv-minimal"
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
      <path d="M7 21h10" />
  <rect width="20" height="14" x="2" y="3" rx="2" />
    </svg>
  );
}
