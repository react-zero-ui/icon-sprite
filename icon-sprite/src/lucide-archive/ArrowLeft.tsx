import { type IconProps } from "../_shared.js";

export function ArrowLeft({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-left"
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
      <path d="m12 19-7-7 7-7" />
  <path d="M19 12H5" />
    </svg>
  );
}
