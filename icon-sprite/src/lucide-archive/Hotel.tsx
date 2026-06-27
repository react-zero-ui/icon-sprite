import { type IconProps } from "../_shared.js";

export function Hotel({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-hotel"
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
      <path d="M10 22v-6.57" />
  <path d="M12 11h.01" />
  <path d="M12 7h.01" />
  <path d="M14 15.43V22" />
  <path d="M15 16a5 5 0 0 0-6 0" />
  <path d="M16 11h.01" />
  <path d="M16 7h.01" />
  <path d="M8 11h.01" />
  <path d="M8 7h.01" />
  <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  );
}
