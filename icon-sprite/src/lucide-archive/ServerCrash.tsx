import { type IconProps } from "../_shared.js";

export function ServerCrash({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-server-crash"
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
      <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
  <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
  <path d="M6 6h.01" />
  <path d="M6 18h.01" />
  <path d="m13 6-4 6h6l-4 6" />
    </svg>
  );
}
