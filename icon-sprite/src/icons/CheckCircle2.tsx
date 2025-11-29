import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { CheckCircle2 as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function CheckCircle2({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("CheckCircle2", size, width, height);
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
  return  renderUse("check-circle-2", width, height, size, SPRITE_PATH, props)
}
