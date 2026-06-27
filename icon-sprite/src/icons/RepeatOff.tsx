import { SPRITE_PATH } from "../config.js";
import { RepeatOff as DevIcon } from "../lucide-archive/RepeatOff.js";
import { renderUse, type IconProps } from "../_shared.js";

export function RepeatOff(props: IconProps) {
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
  return renderUse("repeat-off", SPRITE_PATH, props);
}
