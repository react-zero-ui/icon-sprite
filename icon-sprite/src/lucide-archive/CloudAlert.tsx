import { type IconProps } from "../_shared.js";

export function CloudAlert({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-cloud-alert"
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
      <path d="M12 12v4" />
  <path d="M12 20h.01" />
  <path d="M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642" />
    </svg>
  );
}
