import { SPRITE_PATH } from "../config.js";
import { LayoutPanelLeft as DevIcon } from "../lucide-archive/LayoutPanelLeft.js";
import { renderUse, type IconProps } from "../_shared.js";

export function LayoutPanelLeft(props: IconProps) {
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
  return renderUse("layout-panel-left", SPRITE_PATH, props);
}
