import { SPRITE_PATH } from "../config.js";
import { Metronome as DevIcon } from "../lucide-archive/Metronome.js";
import { renderUse, type IconProps } from "../_shared.js";

export function Metronome(props: IconProps) {
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
  return renderUse("metronome", SPRITE_PATH, props);
}
