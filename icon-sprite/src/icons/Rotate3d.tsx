import { SPRITE_PATH } from "../config.js";
import { Rotate3d as DevIcon } from "../lucide-archive/Rotate3d.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Rotate3d(props: IconProps) {
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
  return renderUse("rotate-3-d", SPRITE_PATH, props);
}
