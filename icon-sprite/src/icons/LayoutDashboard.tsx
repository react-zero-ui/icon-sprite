import { SPRITE_PATH } from "../config.js";
import { LayoutDashboard as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function LayoutDashboard(props: IconProps) {
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
  return renderUse("layout-dashboard", SPRITE_PATH, props);
}
