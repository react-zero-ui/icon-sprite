import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Grid2X2X as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Grid2X2X({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Grid2X2X", size, width, height);
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
  return  renderUse("grid-2-x-2-x", width, height, size, SPRITE_PATH, props)
}
