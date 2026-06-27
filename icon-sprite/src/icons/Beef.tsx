import { SPRITE_PATH } from "../config.js";
import { Beef as DevIcon } from "../lucide-archive/Beef.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Beef(props: IconProps) {
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
  return renderUse("beef", SPRITE_PATH, props);
}
