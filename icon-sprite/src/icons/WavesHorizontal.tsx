import { SPRITE_PATH } from "../config.js";
import { WavesHorizontal as DevIcon } from "../lucide-archive/WavesHorizontal.js";
import { renderUse, type IconProps } from "../_shared.js";

export function WavesHorizontal(props: IconProps) {
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
  return renderUse("waves-horizontal", SPRITE_PATH, props);
}
