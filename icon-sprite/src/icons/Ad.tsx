import { SPRITE_PATH } from "../config.js";
import { Ad as DevIcon } from "../lucide-archive/Ad.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Ad(props: IconProps) {
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
  return renderUse("ad", SPRITE_PATH, props);
}
