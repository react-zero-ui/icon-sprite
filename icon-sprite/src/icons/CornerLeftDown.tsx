import { SPRITE_PATH } from "../config.js";
import { CornerLeftDown as DevIcon } from "../lucide-archive/CornerLeftDown.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CornerLeftDown(props: IconProps) {
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
  return renderUse("corner-left-down", SPRITE_PATH, props);
}
