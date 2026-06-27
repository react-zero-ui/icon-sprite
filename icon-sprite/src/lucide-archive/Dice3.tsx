import { type IconProps } from "../_shared.js";

export function Dice3({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-dice-3"
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <path d="M16 8h.01" />
  <path d="M12 12h.01" />
  <path d="M8 16h.01" />
    </svg>
  );
}
