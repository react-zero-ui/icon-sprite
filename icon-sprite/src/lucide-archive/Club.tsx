import { type IconProps } from "../_shared.js";

export function Club({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-club"
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
      <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
  <path d="M12 17.66L12 22" />
    </svg>
  );
}
