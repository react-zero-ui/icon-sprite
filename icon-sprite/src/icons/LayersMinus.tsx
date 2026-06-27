import { SPRITE_PATH } from "../config.js";
import { LayersMinus as DevIcon } from "../lucide-archive/LayersMinus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function LayersMinus(props: IconProps) {
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
  return renderUse("layers-minus", SPRITE_PATH, props);
}
