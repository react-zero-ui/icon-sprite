import { SPRITE_PATH } from "../config.js";
import { BarChart3 as DevIcon } from "../lucide-archive/BarChart3.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BarChart3(props: IconProps) {
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
  return renderUse("bar-chart-3", SPRITE_PATH, props);
}
