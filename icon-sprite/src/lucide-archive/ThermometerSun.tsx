import { type IconProps } from "../_shared.js";

export function ThermometerSun({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-thermometer-sun"
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
      <path d="M12 2v2" />
  <path d="M12 8a4 4 0 0 0-1.645 7.647" />
  <path d="M2 12h2" />
  <path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m6.34 17.66-1.41 1.41" />
    </svg>
  );
}
