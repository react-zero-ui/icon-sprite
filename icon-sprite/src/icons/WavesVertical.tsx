import { SPRITE_PATH } from "../config.js";
import { WavesVertical as DevIcon } from "../lucide-archive/WavesVertical.js";
import { renderUse, type IconProps } from "../_shared.js";

export function WavesVertical(props: IconProps) {
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
  return renderUse("waves-vertical", SPRITE_PATH, props);
}
