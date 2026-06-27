import { SPRITE_PATH } from "../config.js";
import { BadgeAlert as DevIcon } from "../lucide-archive/BadgeAlert.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BadgeAlert(props: IconProps) {
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
  return renderUse("badge-alert", SPRITE_PATH, props);
}
