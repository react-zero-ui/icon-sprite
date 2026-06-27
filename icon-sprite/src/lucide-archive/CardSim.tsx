import { type IconProps } from "../_shared.js";

export function CardSim({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-card-sim"
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
      <path d="M12 14v4" />
  <path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
  <path d="M8 14h8" />
  <rect x="8" y="10" width="8" height="8" rx="1" />
    </svg>
  );
}
