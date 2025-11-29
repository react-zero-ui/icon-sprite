import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { ChessQueen as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function ChessQueen({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("ChessQueen", size, width, height);
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
  return  renderUse("chess-queen", width, height, size, SPRITE_PATH, props)
}
