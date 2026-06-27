import { type IconProps } from "../_shared.js";

export function CircleArrowOutDownLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-arrow-out-down-left"
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
      <path d="M2 12a10 10 0 1 1 10 10" />
  <path d="m2 22 10-10" />
  <path d="M8 22H2v-6" />
    </svg>
  );
}
