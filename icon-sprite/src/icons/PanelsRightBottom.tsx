import { SPRITE_PATH } from "../config.js";
import { PanelsRightBottom as DevIcon } from "../lucide-archive/PanelsRightBottom.js";
import { renderUse, type IconProps } from "../_shared.js";

export function PanelsRightBottom(props: IconProps) {
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
  return renderUse("panels-right-bottom", SPRITE_PATH, props);
}
