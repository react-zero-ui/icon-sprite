import { type IconProps } from "../_shared.js";

export function BriefcaseMedical({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-briefcase-medical"
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
      <path d="M12 11v4" />
  <path d="M14 13h-4" />
  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  <path d="M18 6v14" />
  <path d="M6 6v14" />
  <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
