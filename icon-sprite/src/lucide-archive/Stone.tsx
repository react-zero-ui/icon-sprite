import { type IconProps } from "../_shared.js";

export function Stone({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-stone"
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
      <path d="M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z" />
  <path d="M11.99 22 14 12l7.822 3.184" />
  <path d="M14 12 8.47 2.302" />
    </svg>
  );
}
