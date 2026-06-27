import { type IconProps } from "../_shared.js";

export function UnfoldVertical({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-unfold-vertical"
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
      <path d="M12 22v-6" />
  <path d="M12 8V2" />
  <path d="M4 12H2" />
  <path d="M10 12H8" />
  <path d="M16 12h-2" />
  <path d="M22 12h-2" />
  <path d="m15 19-3 3-3-3" />
  <path d="m15 5-3-3-3 3" />
    </svg>
  );
}
