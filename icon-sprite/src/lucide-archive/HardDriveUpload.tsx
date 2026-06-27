import { type IconProps } from "../_shared.js";

export function HardDriveUpload({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-hard-drive-upload"
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
      <path d="m16 6-4-4-4 4" />
  <path d="M12 2v8" />
  <rect width="20" height="8" x="2" y="14" rx="2" />
  <path d="M6 18h.01" />
  <path d="M10 18h.01" />
    </svg>
  );
}
