import { SPRITE_PATH } from "../config.js";
import { CircleUserRound as DevIcon } from "../lucide-archive/CircleUserRound.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CircleUserRound(props: IconProps) {
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
  return renderUse("circle-user-round", SPRITE_PATH, props);
}
