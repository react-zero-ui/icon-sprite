import { type IconProps } from "../_shared.js";

export function LaptopMinimalCheck({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-laptop-minimal-check"
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
      <path d="M2 20h20" />
  <path d="m9 10 2 2 4-4" />
  <rect x="3" y="4" width="18" height="12" rx="2" />
    </svg>
  );
}
