import { type IconProps } from "../_shared.js";

export function Pocket({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-pocket"
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
      <path d="M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z" />
  <path d="m8 10 4 4 4-4" />
    </svg>
  );
}
