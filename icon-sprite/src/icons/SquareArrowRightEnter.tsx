import { SPRITE_PATH } from "../config.js";
import { SquareArrowRightEnter as DevIcon } from "../lucide-archive/SquareArrowRightEnter.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SquareArrowRightEnter(props: IconProps) {
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
  return renderUse("square-arrow-right-enter", SPRITE_PATH, props);
}
