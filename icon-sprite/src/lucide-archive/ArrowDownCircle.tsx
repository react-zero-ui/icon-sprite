import { type IconProps } from "../_shared.js";

export function ArrowDownCircle({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-arrow-down-circle"
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
      <circle cx="12" cy="12" r="10" />
  <path d="M12 8v8" />
  <path d="m8 12 4 4 4-4" />
    </svg>
  );
}
