import { type IconProps } from "../_shared.js";

export function ClockArrowUp({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-clock-arrow-up"
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
      <path d="M12 6v6l1.56.78" />
  <path d="M13.227 21.925a10 10 0 1 1 8.767-9.588" />
  <path d="m14 18 4-4 4 4" />
  <path d="M18 22v-8" />
    </svg>
  );
}
