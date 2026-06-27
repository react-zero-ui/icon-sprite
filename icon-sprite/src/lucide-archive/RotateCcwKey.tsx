import { type IconProps } from "../_shared.js";

export function RotateCcwKey({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rotate-ccw-key"
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
      <path d="M12 7v6" />
  <path d="M12 9h2" />
  <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
  <circle cx="12" cy="15" r="2" />
    </svg>
  );
}
