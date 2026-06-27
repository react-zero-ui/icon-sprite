import { SPRITE_PATH } from "../config.js";
import { SavePen as DevIcon } from "../lucide-archive/SavePen.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SavePen(props: IconProps) {
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
  return renderUse("save-pen", SPRITE_PATH, props);
}
