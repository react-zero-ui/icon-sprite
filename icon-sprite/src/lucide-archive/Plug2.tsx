import { type IconProps } from "../_shared.js";

export function Plug2({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-plug-2"
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
      <path d="M9 2v6" />
  <path d="M15 2v6" />
  <path d="M12 17v5" />
  <path d="M5 8h14" />
  <path d="M6 11V8h12v3a6 6 0 1 1-12 0Z" />
    </svg>
  );
}
