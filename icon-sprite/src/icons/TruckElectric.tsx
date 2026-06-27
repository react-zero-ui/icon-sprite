import { SPRITE_PATH } from "../config.js";
import { TruckElectric as DevIcon } from "../lucide-archive/TruckElectric.js";
import { renderUse, type IconProps } from "../_shared.js";

export function TruckElectric(props: IconProps) {
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
  return renderUse("truck-electric", SPRITE_PATH, props);
}
