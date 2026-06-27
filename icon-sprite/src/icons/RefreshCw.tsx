import { SPRITE_PATH } from "../config.js";
import { RefreshCw as DevIcon } from "../lucide-archive/RefreshCw.js";
import { renderUse, type IconProps } from "../_shared.js";

export function RefreshCw(props: IconProps) {
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
  return renderUse("refresh-cw", SPRITE_PATH, props);
}
