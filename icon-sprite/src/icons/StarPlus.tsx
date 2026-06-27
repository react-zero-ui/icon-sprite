import { SPRITE_PATH } from "../config.js";
import { StarPlus as DevIcon } from "../lucide-archive/StarPlus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function StarPlus(props: IconProps) {
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
  return renderUse("star-plus", SPRITE_PATH, props);
}
