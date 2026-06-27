import { SPRITE_PATH } from "../config.js";
import { Slash as DevIcon } from "../lucide-archive/Slash.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Slash(props: IconProps) {
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
  return renderUse("slash", SPRITE_PATH, props);
}
