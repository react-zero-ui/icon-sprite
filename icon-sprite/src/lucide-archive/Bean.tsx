import { type IconProps } from "../_shared.js";

export function Bean({ size, width, height, ...rest }: IconProps) {
  return (
    <svg
      className="lucide lucide-bean"
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
      <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z" />
  <path d="M5.341 10.62a4 4 0 1 0 5.279-5.28" />
    </svg>
  );
}
