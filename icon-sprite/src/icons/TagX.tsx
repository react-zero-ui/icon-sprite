import { SPRITE_PATH } from "../config.js";
import { TagX as DevIcon } from "../lucide-archive/TagX.js";
import { renderUse, type IconProps } from "../_shared.js";

export function TagX(props: IconProps) {
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
  return renderUse("tag-x", SPRITE_PATH, props);
}
