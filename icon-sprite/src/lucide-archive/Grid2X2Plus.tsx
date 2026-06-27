import { type IconProps } from "../_shared.js";

export function Grid2x2Plus({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-grid-2x2-plus"
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
      <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
  <path d="M16 19h6" />
  <path d="M19 22v-6" />
    </svg>
  );
}
