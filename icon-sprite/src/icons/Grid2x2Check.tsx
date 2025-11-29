import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Grid2x2Check as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Grid2x2Check({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Grid2x2Check", size, width, height);
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
  return  renderUse("grid-2-x-2-check", width, height, size, SPRITE_PATH, props)
}
