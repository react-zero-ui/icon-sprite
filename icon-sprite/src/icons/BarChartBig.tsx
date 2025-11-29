import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { BarChartBig as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function BarChartBig({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("BarChartBig", size, width, height);
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    return (
      <DevIcon
        {...(props as any)}
        {...(size != null ? { size } : {})}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return  renderUse("bar-chart-big", width, height, size, SPRITE_PATH, props)
}
