import { type IconProps } from "../_shared.js";

export function Ellipse({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-ellipse"
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
      <ellipse cx="12" cy="12" rx="10" ry="6" />
    </svg>
  );
}
