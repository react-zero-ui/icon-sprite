import { SPRITE_PATH } from "../config.js";
import { PanelTopBottomDashed as DevIcon } from "../lucide-archive/PanelTopBottomDashed.js";
import { renderUse, type IconProps } from "../_shared.js";

export function PanelTopBottomDashed(props: IconProps) {
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
  return renderUse("panel-top-bottom-dashed", SPRITE_PATH, props);
}
