import { type IconProps } from "../_shared.js";

export function Parasol({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-parasol"
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
      <path d="M12.5 11.134 18.196 21" />
  <path d="M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413" />
  <path d="M21 21H3" />
    </svg>
  );
}
