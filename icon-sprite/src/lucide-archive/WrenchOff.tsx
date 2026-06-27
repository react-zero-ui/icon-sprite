import { type IconProps } from "../_shared.js";

export function WrenchOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-wrench-off"
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
      <path d="M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842" />
  <path d="m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88" />
  <path d="m2 2 20 20" />
    </svg>
  );
}
