import { SPRITE_PATH } from "../config.js";
import { Fullscreen as DevIcon } from "../lucide-archive/Fullscreen.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Fullscreen(props: IconProps) {
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
  return renderUse("fullscreen", SPRITE_PATH, props);
}
