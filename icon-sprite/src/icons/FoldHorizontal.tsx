import { SPRITE_PATH } from "../config.js";
import { FoldHorizontal as DevIcon } from "../lucide-archive/FoldHorizontal.js";
import { renderUse, type IconProps } from "../_shared.js";

export function FoldHorizontal(props: IconProps) {
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
  return renderUse("fold-horizontal", SPRITE_PATH, props);
}
