import { SPRITE_PATH } from "../config.js";
import { BellDot as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function BellDot(props: IconProps) {
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
  return renderUse("bell-dot", SPRITE_PATH, props);
}
