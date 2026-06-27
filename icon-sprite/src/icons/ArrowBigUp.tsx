import { SPRITE_PATH } from "../config.js";
import { ArrowBigUp as DevIcon } from "../lucide-archive/ArrowBigUp.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ArrowBigUp(props: IconProps) {
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
  return renderUse("arrow-big-up", SPRITE_PATH, props);
}
