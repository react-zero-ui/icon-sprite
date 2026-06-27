import { SPRITE_PATH } from "../config.js";
import { CloudSun as DevIcon } from "../lucide-archive/CloudSun.js";
import { renderUse, type IconProps } from "../_shared.js";

export function CloudSun(props: IconProps) {
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
  return renderUse("cloud-sun", SPRITE_PATH, props);
}
