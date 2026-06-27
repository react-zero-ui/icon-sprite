import { type IconProps } from "../_shared.js";

export function Cone({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-cone"
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
      <path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" />
  <ellipse cx="12" cy="19" rx="9" ry="3" />
    </svg>
  );
}
