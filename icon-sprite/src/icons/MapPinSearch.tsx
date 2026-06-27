import { SPRITE_PATH } from "../config.js";
import { MapPinSearch as DevIcon } from "../lucide-archive/MapPinSearch.js";
import { renderUse, type IconProps } from "../_shared.js";

export function MapPinSearch(props: IconProps) {
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
  return renderUse("map-pin-search", SPRITE_PATH, props);
}
