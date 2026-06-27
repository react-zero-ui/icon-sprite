import { SPRITE_PATH } from "../config.js";
import { CircleDashed as DevIcon } from "../lucide-archive/CircleDashed.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CircleDashed(props: IconProps) {
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
  return renderUse("circle-dashed", SPRITE_PATH, props);
}
