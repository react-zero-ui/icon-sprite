import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { MailQuestion as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function MailQuestion({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("MailQuestion", size, width, height);
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
  return  renderUse("mail-question", width, height, size, SPRITE_PATH, props)
}
