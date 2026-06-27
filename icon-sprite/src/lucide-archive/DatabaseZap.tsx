import { type IconProps } from "../_shared.js";

export function DatabaseZap({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-database-zap"
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
  <path d="M3 5V19A9 3 0 0 0 15 21.84" />
  <path d="M21 5V8" />
  <path d="M21 12L18 17H22L19 22" />
  <path d="M3 12A9 3 0 0 0 14.59 14.87" />
    </svg>
  );
}
