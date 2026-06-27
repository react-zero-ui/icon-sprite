import { SPRITE_PATH } from "../config.js";
import { ImagePlus as DevIcon } from "../lucide-archive/ImagePlus.js";
import { renderUse, type IconProps } from "../_shared.js";

export function ImagePlus(props: IconProps) {
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
  return renderUse("image-plus", SPRITE_PATH, props);
}
