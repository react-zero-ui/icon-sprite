import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Calendars as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Calendars({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Calendars", size, width, height);
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
  return  renderUse("calendars", width, height, size, SPRITE_PATH, props)
}
