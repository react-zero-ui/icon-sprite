import { SPRITE_PATH } from "../config.js";
import { BellElectric as DevIcon } from "../lucide-archive/BellElectric.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BellElectric(props: IconProps) {
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
  return renderUse("bell-electric", SPRITE_PATH, props);
}
