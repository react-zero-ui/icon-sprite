import { SPRITE_PATH } from "../config.js";
import { GlobeX as DevIcon } from "../lucide-archive/GlobeX.js";
import { renderUse, type IconProps } from "../_shared.js";

export function GlobeX(props: IconProps) {
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
  return renderUse("globe-x", SPRITE_PATH, props);
}
