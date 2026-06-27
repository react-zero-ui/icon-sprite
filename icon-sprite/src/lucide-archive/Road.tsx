import { type IconProps } from "../_shared.js";

export function Road({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-road"
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
      <path d="M12 17v4" />
  <path d="M12 5V3" />
  <path d="M12 9v3" />
  <path d="M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z" />
    </svg>
  );
}
