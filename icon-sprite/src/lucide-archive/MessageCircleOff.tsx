import { type IconProps } from "../_shared.js";

export function MessageCircleOff({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-message-circle-off"
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
      <path d="m2 2 20 20" />
  <path d="M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989" />
  <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
    </svg>
  );
}
