import { type IconProps } from "../_shared.js";

export function CircleArrowOutUpRight({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-arrow-out-up-right"
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
      <path d="M22 12A10 10 0 1 1 12 2" />
  <path d="M22 2 12 12" />
  <path d="M16 2h6v6" />
    </svg>
  );
}
