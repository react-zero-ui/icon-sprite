import { SPRITE_PATH } from "../config.js";
import { SavePlus as DevIcon } from "../lucide-archive/SavePlus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function SavePlus(props: IconProps) {
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
  return renderUse("save-plus", SPRITE_PATH, props);
}
