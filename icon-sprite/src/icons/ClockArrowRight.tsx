import { SPRITE_PATH } from "../config.js";
import { ClockArrowRight as DevIcon } from "../lucide-archive/ClockArrowRight.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ClockArrowRight(props: IconProps) {
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
  return renderUse("clock-arrow-right", SPRITE_PATH, props);
}
