import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { FileQuestion as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function FileQuestion({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("FileQuestion", size, width, height);
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
  return  renderUse("file-question", width, height, size, SPRITE_PATH, props)
}
