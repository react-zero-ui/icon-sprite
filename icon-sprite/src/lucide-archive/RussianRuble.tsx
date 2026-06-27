import { type IconProps } from "../_shared.js";

export function RussianRuble({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-russian-ruble"
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
      <path d="M6 11h8a4 4 0 0 0 0-8H9v18" />
  <path d="M6 15h8" />
    </svg>
  );
}
