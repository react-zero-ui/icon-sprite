import { SPRITE_PATH } from "../config.js";
import { ChartGantt as DevIcon } from "../lucide-archive/ChartGantt.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ChartGantt(props: IconProps) {
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
  return renderUse("chart-gantt", SPRITE_PATH, props);
}
