import { type IconProps } from "../_shared.js";

export function LocateOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-locate-off"
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
      <path d="M12 19v3" />
  <path d="M12 2v3" />
  <path d="M18.89 13.24a7 7 0 0 0-8.13-8.13" />
  <path d="M19 12h3" />
  <path d="M2 12h3" />
  <path d="m2 2 20 20" />
  <path d="M7.05 7.05a7 7 0 0 0 9.9 9.9" />
    </svg>
  );
}
