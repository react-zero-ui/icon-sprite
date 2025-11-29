import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { FileExclamationPoint as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function FileExclamationPoint({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("FileExclamationPoint", size, width, height);
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
  return  renderUse("file-exclamation-point", width, height, size, SPRITE_PATH, props)
}
