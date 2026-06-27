import { SPRITE_PATH } from "../config.js";
import { CalendarArrowDown as DevIcon } from "../lucide-archive/CalendarArrowDown.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CalendarArrowDown(props: IconProps) {
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
  return renderUse("calendar-arrow-down", SPRITE_PATH, props);
}
