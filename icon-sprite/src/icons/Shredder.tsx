import { SPRITE_PATH } from "../config.js";
import { Shredder as DevIcon } from "../lucide-archive/Shredder.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Shredder(props: IconProps) {
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
  return renderUse("shredder", SPRITE_PATH, props);
}
