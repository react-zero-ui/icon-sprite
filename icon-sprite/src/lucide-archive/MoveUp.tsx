import { type IconProps } from "../_shared.js";

export function MoveUp({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-move-up"
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
      <path d="M8 6L12 2L16 6" />
  <path d="M12 2V22" />
    </svg>
  );
}
