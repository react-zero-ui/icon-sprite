import { type IconProps } from "../_shared.js";

export function MSquare({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-m-square"
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
      <path d="M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
