import { SPRITE_PATH } from "../config.js";
import { ChartColumnStacked as DevIcon } from "../lucide-archive/ChartColumnStacked.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ChartColumnStacked(props: IconProps) {
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
  return renderUse("chart-column-stacked", SPRITE_PATH, props);
}
