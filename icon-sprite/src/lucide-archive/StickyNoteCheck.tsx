import { type IconProps } from "../_shared.js";

export function StickyNoteCheck({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-sticky-note-check"
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
      <path d="m15 19 2 2 4-4" />
  <path d="M15 3v5a1 1 0 0 0 1 1h5" />
  <path d="M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5" />
    </svg>
  );
}
