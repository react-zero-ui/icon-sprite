import { type IconProps } from "../_shared.js";

export function ShelvingUnit({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-shelving-unit"
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
      <path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  <path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
  <path d="M20 22V2" />
  <path d="M4 12h16" />
  <path d="M4 20h16" />
  <path d="M4 2v20" />
  <path d="M4 4h16" />
    </svg>
  );
}
