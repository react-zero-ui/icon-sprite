import { SPRITE_PATH } from "../config.js";
import { ParkingSquare as DevIcon } from "../lucide-archive/ParkingSquare.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ParkingSquare(props: IconProps) {
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
  return renderUse("parking-square", SPRITE_PATH, props);
}
