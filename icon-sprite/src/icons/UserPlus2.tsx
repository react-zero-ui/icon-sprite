import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { UserPlus2 as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function UserPlus2({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("UserPlus2", size, width, height);
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
  return  renderUse("user-plus-2", width, height, size, SPRITE_PATH, props)
}
