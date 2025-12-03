import { SPRITE_PATH } from "../config.js";
import { TrendingUpDown as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function TrendingUpDown(props: IconProps) {
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
  return renderUse("trending-up-down", SPRITE_PATH, props);
}
