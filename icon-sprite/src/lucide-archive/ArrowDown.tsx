import { type IconProps } from "../_shared.js";

export function ArrowDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-down"
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
      <path d="M12 5v14" />
  <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
