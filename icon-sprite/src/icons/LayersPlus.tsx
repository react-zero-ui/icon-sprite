import { SPRITE_PATH } from "../config.js";
import { LayersPlus as DevIcon } from "../lucide-archive/LayersPlus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function LayersPlus(props: IconProps) {
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
  return renderUse("layers-plus", SPRITE_PATH, props);
}
