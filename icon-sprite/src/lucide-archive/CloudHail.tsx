import { type IconProps } from "../_shared.js";

export function CloudHail({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-cloud-hail"
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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="M16 14v2" />
  <path d="M8 14v2" />
  <path d="M16 20h.01" />
  <path d="M8 20h.01" />
  <path d="M12 16v2" />
  <path d="M12 22h.01" />
    </svg>
  );
}
