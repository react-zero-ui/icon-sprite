import { type IconProps } from "../_shared.js";

export function Balloon({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-balloon"
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
      <path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" />
  <path d="M12 6a2 2 0 0 1 2 2" />
  <path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" />
    </svg>
  );
}
