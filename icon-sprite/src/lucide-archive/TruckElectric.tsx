import { type IconProps } from "../_shared.js";

export function TruckElectric({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-truck-electric"
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
      <path d="M14 19V7a2 2 0 0 0-2-2H9" />
  <path d="M15 19H9" />
  <path d="M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14" />
  <path d="M2 13v5a1 1 0 0 0 1 1h2" />
  <path d="M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02" />
  <circle cx="17" cy="19" r="2" />
  <circle cx="7" cy="19" r="2" />
    </svg>
  );
}
