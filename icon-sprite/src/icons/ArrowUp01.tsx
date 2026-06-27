import { SPRITE_PATH } from "../config.js";
import { ArrowUp01 as DevIcon } from "../lucide-archive/ArrowUp01.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ArrowUp01(props: IconProps) {
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
  return renderUse("arrow-up-0-1", SPRITE_PATH, props);
}
