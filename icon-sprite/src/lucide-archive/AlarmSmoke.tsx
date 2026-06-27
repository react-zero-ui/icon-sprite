import { type IconProps } from "../_shared.js";

export function AlarmSmoke({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-alarm-smoke"
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
      <path d="M11 21c0-2.5 2-2.5 2-5" />
  <path d="M16 21c0-2.5 2-2.5 2-5" />
  <path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" />
  <path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" />
  <path d="M6 21c0-2.5 2-2.5 2-5" />
    </svg>
  );
}
