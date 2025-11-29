import { SPRITE_PATH } from "../config.js";
import { warnMissingIconSize } from "../utils.js";
import { ParkingSquareOff as DevIcon } from "lucide-react"
import { renderUse,type IconProps,} from "../_shared.js";



export function ParkingSquareOff({ size, width, height, ...props }: IconProps) {
  warnMissingIconSize("ParkingSquareOff", size, width, height);
  if (process.env.NODE_ENV !== "production" && DevIcon) {
    return (
      <DevIcon
        {...(props as any)}
        {...(size != null ? { size } : {})}
        {...(width != null ? { width } : {})}
        {...(height != null ? { height } : {})}
      />
    );
  }
  return  renderUse("parking-square-off", width, height, size, SPRITE_PATH, props)
}
