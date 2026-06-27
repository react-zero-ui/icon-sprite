import { SPRITE_PATH } from "../config.js";
import { Tv2 as DevIcon } from "../lucide-archive/Tv2.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Tv2(props: IconProps) {
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
  return renderUse("tv-2", SPRITE_PATH, props);
}
