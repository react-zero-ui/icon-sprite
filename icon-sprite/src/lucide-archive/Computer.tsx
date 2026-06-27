import { type IconProps } from "../_shared.js";

export function Computer({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-computer"
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
      <rect width="14" height="8" x="5" y="2" rx="2" />
  <rect width="20" height="8" x="2" y="14" rx="2" />
  <path d="M6 18h2" />
  <path d="M12 18h6" />
    </svg>
  );
}
