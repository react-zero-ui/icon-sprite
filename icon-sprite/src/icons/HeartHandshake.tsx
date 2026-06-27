import { SPRITE_PATH } from "../config.js";
import { HeartHandshake as DevIcon } from "../lucide-archive/HeartHandshake.js";
import { renderUse, type IconProps } from "../_shared.js";

export function HeartHandshake(props: IconProps) {
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
  return renderUse("heart-handshake", SPRITE_PATH, props);
}
