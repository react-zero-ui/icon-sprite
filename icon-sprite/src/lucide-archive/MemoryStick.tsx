import { type IconProps } from "../_shared.js";

export function MemoryStick({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-memory-stick"
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
      <path d="M12 12v-2" />
  <path d="M12 18v-2" />
  <path d="M16 12v-2" />
  <path d="M16 18v-2" />
  <path d="M2 11h1.5" />
  <path d="M20 18v-2" />
  <path d="M20.5 11H22" />
  <path d="M4 18v-2" />
  <path d="M8 12v-2" />
  <path d="M8 18v-2" />
  <rect x="2" y="6" width="20" height="10" rx="2" />
    </svg>
  );
}
