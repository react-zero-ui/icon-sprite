import { SPRITE_PATH } from "../config.js";
import { XCircle as DevIcon } from "../lucide-archive/XCircle.js";
import { renderUse, type IconProps } from "../_shared.js";

export function XCircle(props: IconProps) {
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
  return renderUse("x-circle", SPRITE_PATH, props);
}
