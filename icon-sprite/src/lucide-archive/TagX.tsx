import { type IconProps } from "../_shared.js";

export function TagX({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-tag-x"
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
      <path d="m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79" />
  <path d="m16.5 10.5 5 5" />
  <path d="m21.5 10.5-5 5" />
  <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}
