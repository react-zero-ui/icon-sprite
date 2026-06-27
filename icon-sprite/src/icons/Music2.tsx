import { SPRITE_PATH } from "../config.js";
import { Music2 as DevIcon } from "../lucide-archive/Music2.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Music2(props: IconProps) {
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
  return renderUse("music-2", SPRITE_PATH, props);
}
