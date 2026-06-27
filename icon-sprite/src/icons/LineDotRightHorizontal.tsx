import { SPRITE_PATH } from "../config.js";
import { LineDotRightHorizontal as DevIcon } from "../lucide-archive/LineDotRightHorizontal.js";
import { renderUse, type IconProps } from "../_shared.js";

export function LineDotRightHorizontal(props: IconProps) {
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
  return renderUse("line-dot-right-horizontal", SPRITE_PATH, props);
}
