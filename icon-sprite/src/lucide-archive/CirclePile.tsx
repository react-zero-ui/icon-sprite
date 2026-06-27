import { type IconProps } from "../_shared.js";

export function CirclePile({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-circle-pile"
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
      <circle cx="12" cy="19" r="2" />
  <circle cx="12" cy="5" r="2" />
  <circle cx="16" cy="12" r="2" />
  <circle cx="20" cy="19" r="2" />
  <circle cx="4" cy="19" r="2" />
  <circle cx="8" cy="12" r="2" />
    </svg>
  );
}
