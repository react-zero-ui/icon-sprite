import { SPRITE_PATH } from "../config.js";
import { Summary as DevIcon } from "../lucide-archive/Summary.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Summary(props: IconProps) {
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
  return renderUse("summary", SPRITE_PATH, props);
}
