import { type IconProps } from "../_shared.js";

export function GripHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-grip-horizontal"
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
      <circle cx="12" cy="9" r="1" />
  <circle cx="19" cy="9" r="1" />
  <circle cx="5" cy="9" r="1" />
  <circle cx="12" cy="15" r="1" />
  <circle cx="19" cy="15" r="1" />
  <circle cx="5" cy="15" r="1" />
    </svg>
  );
}
