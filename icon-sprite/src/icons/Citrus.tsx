import { SPRITE_PATH } from "../config.js";
import { Citrus as DevIcon } from "../lucide-archive/Citrus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Citrus(props: IconProps) {
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
  return renderUse("citrus", SPRITE_PATH, props);
}
