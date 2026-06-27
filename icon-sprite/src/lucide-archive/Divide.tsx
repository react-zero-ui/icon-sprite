import { type IconProps } from "../_shared.js";

export function Divide({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-divide"
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
      <circle cx="12" cy="6" r="1" />
  <line x1="5" x2="19" y1="12" y2="12" />
  <circle cx="12" cy="18" r="1" />
    </svg>
  );
}
