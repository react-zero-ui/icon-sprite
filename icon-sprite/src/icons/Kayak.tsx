import { SPRITE_PATH } from "../config.js";
import { Kayak as DevIcon } from "../lucide-archive/Kayak.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Kayak(props: IconProps) {
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
  return renderUse("kayak", SPRITE_PATH, props);
}
