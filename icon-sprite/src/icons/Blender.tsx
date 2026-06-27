import { SPRITE_PATH } from "../config.js";
import { Blender as DevIcon } from "../lucide-archive/Blender.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Blender(props: IconProps) {
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
  return renderUse("blender", SPRITE_PATH, props);
}
