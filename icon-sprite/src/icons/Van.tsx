import { SPRITE_PATH } from "../config.js";
import { Van as DevIcon } from "../lucide-archive/Van.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Van(props: IconProps) {
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
  return renderUse("van", SPRITE_PATH, props);
}
