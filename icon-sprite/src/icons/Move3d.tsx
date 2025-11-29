import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Move3d as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Move3d({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Move3d", size, width, height);
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
  return  renderUse("move-3-d", width, height, size, SPRITE_PATH, props)
}
