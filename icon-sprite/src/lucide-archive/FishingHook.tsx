import { type IconProps } from "../_shared.js";

export function FishingHook({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-fishing-hook"
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
      <path d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" />
  <path d="M20.414 8.586 22 7" />
  <circle cx="19" cy="10" r="2" />
    </svg>
  );
}
