import { type IconProps } from "../_shared.js";

export function TouchpadOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-touchpad-off"
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
      <path d="M12 20v-6" />
  <path d="M19.656 14H22" />
  <path d="M2 14h12" />
  <path d="m2 2 20 20" />
  <path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
  <path d="M9.656 4H20a2 2 0 0 1 2 2v10.344" />
    </svg>
  );
}
