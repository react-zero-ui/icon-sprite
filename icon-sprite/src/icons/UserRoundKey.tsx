import { SPRITE_PATH } from "../config.js";
import { UserRoundKey as DevIcon } from "../lucide-archive/UserRoundKey.js";
import { renderUse, type IconProps } from "../_shared.js";

export function UserRoundKey(props: IconProps) {
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
  return renderUse("user-round-key", SPRITE_PATH, props);
}
