import { type IconProps } from "../_shared.js";

export function Fence({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-fence"
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
      <path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
  <path d="M6 8h4" />
  <path d="M6 18h4" />
  <path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
  <path d="M14 8h4" />
  <path d="M14 18h4" />
  <path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" />
    </svg>
  );
}
