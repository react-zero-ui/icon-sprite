import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { Axis3D as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function Axis3D({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("Axis3D", size, width, height);
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
  return  renderUse("axis-3-d", width, height, size, SPRITE_PATH, props)
}
