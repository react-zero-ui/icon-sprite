import { type IconProps } from "../_shared.js";

export function Cookie({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-cookie"
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
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
  <path d="M8.5 8.5v.01" />
  <path d="M16 15.5v.01" />
  <path d="M12 12v.01" />
  <path d="M11 17v.01" />
  <path d="M7 14v.01" />
    </svg>
  );
}
