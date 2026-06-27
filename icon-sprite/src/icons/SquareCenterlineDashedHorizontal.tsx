import { SPRITE_PATH } from "../config.js";
import { SquareCenterlineDashedHorizontal as DevIcon } from "../lucide-archive/SquareCenterlineDashedHorizontal.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SquareCenterlineDashedHorizontal(props: IconProps) {
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
  return renderUse("square-centerline-dashed-horizontal", SPRITE_PATH, props);
}
