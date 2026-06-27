import { SPRITE_PATH } from "../config.js";
import { SquareArrowRightExit as DevIcon } from "../lucide-archive/SquareArrowRightExit.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SquareArrowRightExit(props: IconProps) {
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
  return renderUse("square-arrow-right-exit", SPRITE_PATH, props);
}
