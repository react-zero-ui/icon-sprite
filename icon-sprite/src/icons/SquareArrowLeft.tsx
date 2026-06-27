import { SPRITE_PATH } from "../config.js";
import { SquareArrowLeft as DevIcon } from "../lucide-archive/SquareArrowLeft.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SquareArrowLeft(props: IconProps) {
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
  return renderUse("square-arrow-left", SPRITE_PATH, props);
}
