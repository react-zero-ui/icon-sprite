import { type IconProps } from "../_shared.js";

export function WalletCards({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-wallet-cards"
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
      <path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" />
  <path d="M3 7h18" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
