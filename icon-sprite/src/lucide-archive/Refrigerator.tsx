import { type IconProps } from "../_shared.js";

export function Refrigerator({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-refrigerator"
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
      <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
  <path d="M5 10h14" />
  <path d="M15 7v6" />
    </svg>
  );
}
