import { type IconProps } from "../_shared.js";

export function Shrub({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-shrub"
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
      <path d="M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5" />
  <path d="M14.5 14.5 12 17" />
  <path d="M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z" />
    </svg>
  );
}
