import { type IconProps } from "../_shared.js";

export function ArrowDownToLine({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-down-to-line"
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
      <path d="M12 17V3" />
  <path d="m6 11 6 6 6-6" />
  <path d="M19 21H5" />
    </svg>
  );
}
