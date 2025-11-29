import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { LibrarySquare as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function LibrarySquare({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("LibrarySquare", size, width, height);
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
  return  renderUse("library-square", width, height, size, SPRITE_PATH, props)
}
