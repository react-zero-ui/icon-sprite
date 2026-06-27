import { type IconProps } from "../_shared.js";

export function VenusAndMars({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-venus-and-mars"
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
      <path d="M10 20h4" />
  <path d="M12 16v6" />
  <path d="M17 2h4v4" />
  <path d="m21 2-5.46 5.46" />
  <circle cx="12" cy="11" r="5" />
    </svg>
  );
}
