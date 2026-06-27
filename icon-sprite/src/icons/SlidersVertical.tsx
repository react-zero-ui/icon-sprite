import { SPRITE_PATH } from "../config.js";
import { SlidersVertical as DevIcon } from "../lucide-archive/SlidersVertical.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SlidersVertical(props: IconProps) {
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
  return renderUse("sliders-vertical", SPRITE_PATH, props);
}
