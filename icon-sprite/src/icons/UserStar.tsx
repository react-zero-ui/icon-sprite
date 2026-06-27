import { SPRITE_PATH } from "../config.js";
import { UserStar as DevIcon } from "../lucide-archive/UserStar.js";
import { renderUse, type IconProps } from "../_shared.js";

export function UserStar(props: IconProps) {
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
  return renderUse("user-star", SPRITE_PATH, props);
}
