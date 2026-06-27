import { SPRITE_PATH } from "../config.js";
import { UserKey as DevIcon } from "../lucide-archive/UserKey.js";
import { renderUse, type IconProps } from "../_shared.js";

export function UserKey(props: IconProps) {
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
  return renderUse("user-key", SPRITE_PATH, props);
}
