import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Scale3d as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Scale3d({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Scale3d", size, width, height);
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
  return  renderUse("scale-3-d", width, height, size, SPRITE_PATH, props)
}
