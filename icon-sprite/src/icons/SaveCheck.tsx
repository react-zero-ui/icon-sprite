import { SPRITE_PATH } from "../config.js";
import { SaveCheck as DevIcon } from "../lucide-archive/SaveCheck.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SaveCheck(props: IconProps) {
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    const { size, width, height, ...rest } = props;
    return (
      <DevIcon
        {...(rest as any)}
        size={size ?? 24}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return renderUse("save-check", SPRITE_PATH, props);
}
