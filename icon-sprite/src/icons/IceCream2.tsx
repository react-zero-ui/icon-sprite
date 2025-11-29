import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { IceCream2 as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function IceCream2({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("IceCream2", size, width, height);
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
  return  renderUse("ice-cream-2", width, height, size, SPRITE_PATH, props)
}
