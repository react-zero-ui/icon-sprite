import { SPRITE_PATH } from "../config.js";
import { Trash2 as DevIcon } from "../lucide-archive/Trash2.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Trash2(props: IconProps) {
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
  return renderUse("trash-2", SPRITE_PATH, props);
}
