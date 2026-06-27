import { type IconProps } from "../_shared.js";

export function UnfoldHorizontal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-unfold-horizontal"
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
      <path d="M16 12h6" />
  <path d="M8 12H2" />
  <path d="M12 2v2" />
  <path d="M12 8v2" />
  <path d="M12 14v2" />
  <path d="M12 20v2" />
  <path d="m19 15 3-3-3-3" />
  <path d="m5 9-3 3 3 3" />
    </svg>
  );
}
