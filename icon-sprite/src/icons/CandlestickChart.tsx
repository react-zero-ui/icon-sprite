import { SPRITE_PATH } from "../config.js";
import { CandlestickChart as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function CandlestickChart(props: IconProps) {
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
  return renderUse("candlestick-chart", SPRITE_PATH, props);
}
