import { type IconProps } from "../_shared.js";

export function FileSliders({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-file-sliders"
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M8 12h8" />
  <path d="M10 11v2" />
  <path d="M8 17h8" />
  <path d="M14 16v2" />
    </svg>
  );
}
