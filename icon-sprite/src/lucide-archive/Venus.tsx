import { type IconProps } from "../_shared.js";

export function Venus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-venus"
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
      <path d="M12 15v7" />
  <path d="M9 19h6" />
  <circle cx="12" cy="9" r="6" />
    </svg>
  );
}
