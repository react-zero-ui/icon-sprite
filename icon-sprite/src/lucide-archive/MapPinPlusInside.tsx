import { type IconProps } from "../_shared.js";

export function MapPinPlusInside({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-map-pin-plus-inside"
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
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
  <path d="M12 7v6" />
  <path d="M9 10h6" />
    </svg>
  );
}
