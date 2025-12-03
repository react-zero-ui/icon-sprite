import { SPRITE_PATH } from "../config.js";
import { DropletOff as DevIcon } from "lucide-react";
import { renderUse, type IconProps } from "../_shared.js";

export function DropletOff(props: IconProps) {
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
  return renderUse("droplet-off", SPRITE_PATH, props);
}
