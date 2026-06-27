import { type IconProps } from "../_shared.js";

export function BanknoteArrowDown({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-banknote-arrow-down"
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
      <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
  <path d="m16 19 3 3 3-3" />
  <path d="M18 12h.01" />
  <path d="M19 16v6" />
  <path d="M6 12h.01" />
  <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
