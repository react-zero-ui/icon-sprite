import { type IconProps } from "../_shared.js";

export function FishSymbol({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-fish-symbol"
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
      <path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
    </svg>
  );
}
