import { SPRITE_PATH } from "../config.js";
import { IceCreamCone as DevIcon } from "../lucide-archive/IceCreamCone.js";
import { renderUse, type IconProps } from "../_shared.js";

export function IceCreamCone(props: IconProps) {
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
  return renderUse("ice-cream-cone", SPRITE_PATH, props);
}
