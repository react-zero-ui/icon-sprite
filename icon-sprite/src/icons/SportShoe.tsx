import { SPRITE_PATH } from "../config.js";
import { SportShoe as DevIcon } from "../lucide-archive/SportShoe.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SportShoe(props: IconProps) {
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
  return renderUse("sport-shoe", SPRITE_PATH, props);
}
