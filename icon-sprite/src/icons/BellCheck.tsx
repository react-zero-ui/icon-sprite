import { SPRITE_PATH } from "../config.js";
import { BellCheck as DevIcon } from "../lucide-archive/BellCheck.js";
import { renderUse, type IconProps } from "../_shared.js";

export function BellCheck(props: IconProps) {
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
  return renderUse("bell-check", SPRITE_PATH, props);
}
