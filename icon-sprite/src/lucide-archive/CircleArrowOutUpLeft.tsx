import { type IconProps } from "../_shared.js";

export function CircleArrowOutUpLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-arrow-out-up-left"
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
      <path d="M2 8V2h6" />
  <path d="m2 2 10 10" />
  <path d="M12 2A10 10 0 1 1 2 12" />
    </svg>
  );
}
