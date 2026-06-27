import { SPRITE_PATH } from "../config.js";
import { FishingRod as DevIcon } from "../lucide-archive/FishingRod.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FishingRod(props: IconProps) {
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
  return renderUse("fishing-rod", SPRITE_PATH, props);
}
