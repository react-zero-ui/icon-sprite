import { type IconProps } from "../_shared.js";

export function WebcamOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-webcam-off"
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
      <path d="M12 22v-4" />
  <path d="M12.754 7.096a3 3 0 0 1 2.15 2.15" />
  <path d="M12.863 12.873a3 3 0 0 1-3.736-3.735" />
  <path d="M16.566 16.57A8 8 0 0 1 5.43 5.433" />
  <path d="m2 2 20 20" />
  <path d="M7 22h10" />
  <path d="M8.478 2.817a8 8 0 0 1 10.705 10.705" />
    </svg>
  );
}
