import { type IconProps } from "../_shared.js";

export function RectangleHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-rectangle-horizontal"
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}
