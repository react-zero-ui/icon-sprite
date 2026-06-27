import { SPRITE_PATH } from "../config.js";
import { CircleParkingOff as DevIcon } from "../lucide-archive/CircleParkingOff.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CircleParkingOff(props: IconProps) {
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
  return renderUse("circle-parking-off", SPRITE_PATH, props);
}
