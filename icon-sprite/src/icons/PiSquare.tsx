import { SPRITE_PATH } from "../config.js";
import { PiSquare as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function PiSquare(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return (
      <DevIcon
        {...(rest as any)}
        size={size ?? 24}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return renderUse("pi-square", SPRITE_PATH, props);
}
