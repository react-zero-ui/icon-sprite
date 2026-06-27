import { SPRITE_PATH } from "../config.js";
import { NutOff as DevIcon } from "../lucide-archive/NutOff.js";
import { renderUse, type IconProps } from "../_shared.js";

export function NutOff(props: IconProps) {
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
  return renderUse("nut-off", SPRITE_PATH, props);
}
