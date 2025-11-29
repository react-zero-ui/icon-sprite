import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { ChessKnight as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function ChessKnight({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("ChessKnight", size, width, height);
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
  return  renderUse("chess-knight", width, height, size, SPRITE_PATH, props)
}
