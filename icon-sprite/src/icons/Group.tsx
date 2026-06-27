import { SPRITE_PATH } from "../config.js";
import { Group as DevIcon } from "../lucide-archive/Group.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Group(props: IconProps) {
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
  return renderUse("group", SPRITE_PATH, props);
}
