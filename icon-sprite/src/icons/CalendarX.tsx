import { SPRITE_PATH } from "../config.js";
import { CalendarX as DevIcon } from "../lucide-archive/CalendarX.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CalendarX(props: IconProps) {
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
  return renderUse("calendar-x", SPRITE_PATH, props);
}
