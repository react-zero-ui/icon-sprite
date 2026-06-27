import { type IconProps } from "../_shared.js";

export function GlobeX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-globe-x"
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
      <path d="m16 3 5 5" />
  <path d="M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" />
  <path d="m21 3-5 5" />
    </svg>
  );
}
