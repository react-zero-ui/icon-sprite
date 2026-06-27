import { type IconProps } from "../_shared.js";

export function Terminal({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-terminal"
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
      <path d="M12 19h8" />
  <path d="m4 17 6-6-6-6" />
    </svg>
  );
}
