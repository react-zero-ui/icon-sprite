import { type IconProps } from "../_shared.js";

export function TicketsPlane({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-tickets-plane"
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
      <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" />
  <path d="m12 13.5 3.794.506" />
  <path d="m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" />
  <path d="M6 10V8" />
  <path d="M6 14v1" />
  <path d="M6 19v2" />
  <rect x="2" y="8" width="20" height="13" rx="2" />
    </svg>
  );
}
