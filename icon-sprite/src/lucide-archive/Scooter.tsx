import { type IconProps } from "../_shared.js";

export function Scooter({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-scooter"
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
      <path d="M21 4h-3.5l2 11.05" />
  <path d="M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009" />
  <circle cx="19.5" cy="17.5" r="2.5" />
  <circle cx="4.5" cy="17.5" r="2.5" />
    </svg>
  );
}
