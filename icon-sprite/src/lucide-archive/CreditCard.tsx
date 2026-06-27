import { type IconProps } from "../_shared.js";

export function CreditCard({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-credit-card"
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
  <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
