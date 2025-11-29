import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { MousePointer2Off as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function MousePointer2Off({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("MousePointer2Off", size, width, height);
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
  return  renderUse("mouse-pointer-2-off", width, height, size, SPRITE_PATH, props)
}
