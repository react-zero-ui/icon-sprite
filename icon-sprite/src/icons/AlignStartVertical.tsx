import { SPRITE_PATH } from "../config.js";
import { AlignStartVertical as DevIcon } from "../lucide-archive/AlignStartVertical.js";
import { renderUse, type IconProps } from "../_shared.js";

export function AlignStartVertical(props: IconProps) {
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
  return renderUse("align-start-vertical", SPRITE_PATH, props);
}
