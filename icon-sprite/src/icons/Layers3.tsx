import { SPRITE_PATH } from "../config.js";
import { Layers3 as DevIcon } from "../lucide-archive/Layers3.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Layers3(props: IconProps) {
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
  return renderUse("layers-3", SPRITE_PATH, props);
}
