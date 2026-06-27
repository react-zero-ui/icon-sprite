import { SPRITE_PATH } from "../config.js";
import { Theater as DevIcon } from "../lucide-archive/Theater.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Theater(props: IconProps) {
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
  return renderUse("theater", SPRITE_PATH, props);
}
