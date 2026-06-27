import { type IconProps } from "../_shared.js";

export function ChevronsLeftRightEllipsis({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-chevrons-left-right-ellipsis"
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
      <path d="M12 12h.01" />
  <path d="M16 12h.01" />
  <path d="m17 7 5 5-5 5" />
  <path d="m7 7-5 5 5 5" />
  <path d="M8 12h.01" />
    </svg>
  );
}
