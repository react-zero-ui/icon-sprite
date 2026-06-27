import { SPRITE_PATH } from "../config.js";
import { PanelBottomOpen as DevIcon } from "../lucide-archive/PanelBottomOpen.js";
import { renderUse, type IconProps } from "../_shared.js";

export function PanelBottomOpen(props: IconProps) {
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
  return renderUse("panel-bottom-open", SPRITE_PATH, props);
}
